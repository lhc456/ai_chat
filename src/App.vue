<script setup lang="ts">
import { onMounted, nextTick, watch, ref } from 'vue'
import { useChatStore } from '@/stores/chatStore'
import { useChat } from '@/composables/useChat'
import ChatMessage from '@/components/ChatMessage.vue'
import ChatInput from '@/components/ChatInput.vue'
import ModelSelector from '@/components/ModelSelector.vue'
import TypingIndicator from '@/components/TypingIndicator.vue'

const store = useChatStore()
const { inputText, handleSend } = useChat()

const chatContainerRef = ref<HTMLElement | null>(null)

// 自动滚动到底部
watch(
  () => store.messages.length,
  async () => {
    await nextTick()
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
    }
  }
)

onMounted(() => {
  store.loadModels()
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center p-4">
    <div class="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[80vh]">
      
      <!-- 头部 -->
      <header class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-4">
        <h1 class="text-2xl font-bold mb-2">🤖 AI 聊天助手</h1>
        <ModelSelector />
      </header>

      <!-- 聊天区域 -->
      <main 
        ref="chatContainerRef"
        class="flex-1 overflow-y-auto p-6 bg-gray-50"
      >
        <!-- 错误提示 -->
        <div 
          v-if="store.error"
          class="mb-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 rounded"
        >
          {{ store.error }}
        </div>

        <!-- 欢迎消息 -->
        <div v-if="store.messages.length === 0" class="text-center text-gray-500 mt-10">
          <p>开始和 AI 对话吧！💬</p>
        </div>

        <!-- 消息列表 -->
        <ChatMessage
          v-for="message in store.messages"
          :key="message.id"
          :message="message"
        />

        <!-- 打字指示器 -->
        <TypingIndicator v-if="store.isStreaming" />
      </main>

      <!-- 输入区域 -->
      <ChatInput @send="handleSend" />
    </div>
  </div>
</template>
