import axios from 'axios'
import type { ModelInfo } from '@/types/chat'

const OLLAMA_BASE_URL = import.meta.env.VITE_OLLAMA_URL || 'http://localhost:11434'

const api = axios.create({
  baseURL: OLLAMA_BASE_URL,
  timeout: 60000, // 60 秒超时
})

/**
 * 获取可用模型列表
 */
export async function getModels(): Promise<ModelInfo[]> {
  const response = await api.get('/api/tags')
  return response.data.models || []
}

/**
 * 发送聊天请求（非流式）
 */
export async function generateResponse(
  prompt: string,
  model: string
): Promise<string> {
  const response = await api.post('/api/generate', {
    model,
    prompt,
    stream: false,
  })
  return response.data.response
}

/**
 * 发送聊天请求（流式）
 */
export async function* generateStreamResponse(
  prompt: string,
  model: string
): AsyncGenerator<string> {
  const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: true,
      // 添加系统提示，强制使用中文
      system: '你是一个专业的AI助手。请始终使用中文（简体）回答所有问题。即使用户使用其他语言提问，也要用中文回答。',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error('Ollama API Error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText,
    })
    throw new Error(`HTTP error! status: ${response.status}`)
  }

  const reader = response.body?.getReader()
  if (!reader) throw new Error('无法获取响应流')

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    const chunk = new TextDecoder().decode(value)
    console.log('Raw chunk:', chunk) // 调试用
    const lines = chunk.split('\n').filter(Boolean)

    for (const line of lines) {
      try {
        const json = JSON.parse(line)
        console.log('Parsed JSON:', json) // 调试用
        if (json.response) {
          yield json.response
        }
      } catch (e) {
        console.error('解析流数据失败:', e, 'line:', line)
      }
    }
  }
}
