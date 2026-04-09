import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Message, ModelInfo } from '@/types/chat'
import { getModels, generateStreamResponse } from '@/api/ollama'

export const useChatStore = defineStore('chat', () => {
  // State
  const messages = ref<Message[]>([])
  const currentModel = ref<string>('llama2')
  const models = ref<ModelInfo[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)
  const isStreaming = ref(false)

  // Actions
  /**
   * 加载模型列表
   */
  async function loadModels() {
    try {
      models.value = await getModels()
      error.value = null
    } catch (e) {
      error.value = '加载模型列表失败'
      console.error(e)
    }
  }

  /**
   * 发送消息
   */
  async function sendMessage(content: string) {
    if (!content.trim()) return

    // 添加用户消息
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: Date.now(),
    }
    messages.value.push(userMessage)

    // 创建一个空的 AI 消息用于显示 Loading
    const aiMessageId = (Date.now() + 1).toString()
    const aiMessage: Message = {
      id: aiMessageId,
      role: 'assistant',
      content: '',
      timestamp: Date.now(),
    }
    messages.value.push(aiMessage)

    isLoading.value = true
    isStreaming.value = true
    error.value = null

    try {
      // 添加中文提示，强制 AI 使用中文回复
      const promptWithLanguage = `${content}\n\n请用中文回答。`

      console.log('开始发送请求到 Ollama...')

      // 使用流式输出
      for await (const chunk of generateStreamResponse(promptWithLanguage, currentModel.value)) {
        console.log('收到数据块:', chunk)
        
        // 找到 AI 消息并追加内容
        const aiMsgIndex = messages.value.findIndex(msg => msg.id === aiMessageId)
        if (aiMsgIndex !== -1) {
          messages.value[aiMsgIndex].content += chunk
          console.log('当前 AI 消息内容:', messages.value[aiMsgIndex].content)
        } else {
          console.error('找不到 AI 消息！')
        }
      }

      console.log('AI 回复完成')
      isStreaming.value = false
      isLoading.value = false
    } catch (e) {
      console.error('发送消息错误:', e)
      error.value = e instanceof Error ? e.message : '发送消息失败'
      isLoading.value = false
      isStreaming.value = false
      
      // 如果 AI 消息仍然为空，移除它
      const aiMsgIndex = messages.value.findIndex(msg => msg.id === aiMessageId)
      if (aiMsgIndex !== -1 && !messages.value[aiMsgIndex].content) {
        messages.value.splice(aiMsgIndex, 1)
      }
    }
  }

  /**
   * 清除聊天记录
   */
  function clearMessages() {
    messages.value = []
  }

  /**
   * 设置当前模型
   */
  function setCurrentModel(model: string) {
    currentModel.value = model
  }

  return {
    // State
    messages,
    currentModel,
    models,
    isLoading,
    error,
    isStreaming,
    // Actions
    loadModels,
    sendMessage,
    clearMessages,
    setCurrentModel,
  }
})
