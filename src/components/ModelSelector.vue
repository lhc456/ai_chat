<script setup lang="ts">
import { useChatStore } from '@/stores/chatStore'

const store = useChatStore()

function handleModelChange(event: Event) {
  const target = event.target as HTMLSelectElement
  store.setCurrentModel(target.value)
}
</script>

<template>
  <div class="flex items-center gap-2">
    <label class="text-sm text-white/90">模型:</label>
    <select
      :value="store.currentModel"
      @change="handleModelChange"
      class="px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option 
        v-for="model in store.models" 
        :key="model.name"
        :value="model.name"
      >
        {{ model.name }}
      </option>
    </select>
    <button
      @click="store.loadModels()"
      :disabled="store.isLoading"
      class="px-2 py-1 text-sm text-white hover:text-white/80 disabled:opacity-50 transition-colors"
      title="刷新模型列表"
    >
      🔄
    </button>
  </div>
</template>
