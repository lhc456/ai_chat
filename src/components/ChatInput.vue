<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  modelValue?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
  send: [text: string]
}>()

const inputValue = ref(props.modelValue || '')
const isComposing = ref(false)

// 监听外部变化（例如发送后清空）
watch(() => props.modelValue, (newVal) => {
  if (newVal !== undefined) {
    inputValue.value = newVal
  }
})

function handleSend() {
  if (isComposing.value || !inputValue.value.trim()) return
  
  emit('send', inputValue.value.trim())
  // 发送后清空输入框，但不触发 update:modelValue（由父组件控制）
  inputValue.value = ''
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey && !isComposing.value) {
    e.preventDefault()
    handleSend()
  }
}

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="flex gap-2 p-4 bg-white border-t border-gray-200">
    <textarea
      v-model="inputValue"
      @input="handleInput"
      @compositionstart="isComposing = true"
      @compositionend="isComposing = false"
      @keydown="handleKeydown"
      placeholder="输入消息... (Shift+Enter 换行)"
      rows="1"
      class="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
      style="max-height: 150px;"
    />
    <button
      @click="handleSend"
      :disabled="!inputValue.trim() || isComposing"
      class="px-6 py-3 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      发送
    </button>
  </div>
</template>
