// 消息角色类型
export type MessageRole = 'user' | 'assistant'

// 消息接口
export interface Message {
  id: string
  role: MessageRole
  content: string
  timestamp: number
}

// 模型信息
export interface ModelInfo {
  name: string
  size?: number
  modifiedAt?: string
}

// 聊天状态
export interface ChatState {
  messages: Message[]
  currentModel: string
  models: ModelInfo[]
  isLoading: boolean
  error: string | null
  isStreaming: boolean
}

// Ollama API 响应
export interface OllamaGenerateResponse {
  model: string
  response: string
  done: boolean
}
