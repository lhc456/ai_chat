<script setup lang="ts">
import type { Message } from '@/types/chat'

defineProps<{
  message: Message
}>()

// 格式化时间
function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div 
    class="flex gap-3 mb-4"
    :class="message.role === 'user' ? 'flex-row-reverse' : 'flex-row'"
  >
    <!-- 头像 -->
    <div 
      class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
      :class="message.role === 'user' ? 'bg-blue-500' : 'bg-purple-500'"
    >
      <span class="text-white text-sm">
        {{ message.role === 'user' ? '👤' : '🤖' }}
      </span>
    </div>

    <!-- 消息内容 -->
    <div 
      class="max-w-[70%] px-4 py-2 rounded-2xl"
      :class="[
        message.role === 'user' 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
      ]"
    >
      <p class="whitespace-pre-wrap break-words">{{ message.content }}</p>
      <span 
        class="text-xs mt-1 block opacity-70"
        :class="message.role === 'user' ? 'text-blue-100' : 'text-gray-500'"
      >
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>
