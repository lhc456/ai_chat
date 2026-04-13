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

  // 创建 TextDecoder 实例，用于处理 UTF-8 编码
  const textDecoder = new TextDecoder('utf-8', { fatal: false })
  let buffer = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break

    // 解码数据块，处理可能的不完整字符
    const chunk = textDecoder.decode(value, { stream: true })
    buffer += chunk
    
    // 按行分割
    const lines = buffer.split('\n')
    
    // 保留最后一个可能不完整的行
    buffer = lines.pop() || ''
    
    // 处理完整的行
    for (const line of lines) {
      if (!line.trim()) continue
      
      try {
        const json = JSON.parse(line)
        if (json.response) {
          yield json.response
        }
        // 如果是最后一条消息，可以做一些清理工作
        if (json.done) {
          console.log('AI 生成完成')
        }
      } catch (e) {
        console.error('解析流数据失败:', e, 'line:', line)
      }
    }
  }
  
  // 处理最后可能剩余的数据
  if (buffer.trim()) {
    try {
      const json = JSON.parse(buffer)
      if (json.response) {
        yield json.response
      }
    } catch (e) {
      console.error('解析最后数据块失败:', e)
    }
  }
}
