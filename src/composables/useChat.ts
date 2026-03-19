import { ref } from 'vue'
import { useChatStore } from '@/stores/chatStore'

/**
 * 聊天相关逻辑封装
 */
export function useChat() {
  const store = useChatStore()
  const inputText = ref('')
  const isComposing = ref(false) // 中文输入法状态

  /**
   * 发送消息
   */
  function handleSend() {
    if (isComposing.value || !inputText.value.trim()) return
    
    store.sendMessage(inputText.value)
    inputText.value = ''
  }

  /**
   * 键盘按下处理
   */
  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey && !isComposing.value) {
      e.preventDefault()
      handleSend()
    }
  }

  return {
    inputText,
    isComposing,
    handleSend,
    handleKeydown,
  }
}
