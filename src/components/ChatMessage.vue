<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import MarkdownIt from 'markdown-it'
import type { Message } from '@/types/chat'

const props = defineProps<{
  message: Message
}>()

// 格式化时间
function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 初始化 markdown-it
const md = new MarkdownIt({
  html: false,        // 不启用 HTML 标签（安全）
  breaks: true,       // 支持换行
  linkify: true,      // 自动识别链接
  typographer: true,  // 启用排版优化
})

// 自定义渲染规则
md.renderer.rules.fence = function(tokens: any[], idx: number) {
  const token = tokens[idx]
  const code = token.content
  const lang = token.info.trim()
  
  return `<pre class="code-block"><code class="language-${lang || 'text'}">${escapeHtml(code)}</code></pre>`
}

// HTML 转义函数
function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// 优化：使用缓存避免频繁重新渲染
const renderedContent = ref('')
let renderTimer: number | null = null

// 监听内容变化，使用防抖渲染
watch(
  () => props.message.content,
  (newContent) => {
    if (!newContent) {
      renderedContent.value = ''
      return
    }
    
    // 清除之前的定时器
    if (renderTimer) {
      clearTimeout(renderTimer)
    }
    
    // 防抖渲染：等待 50ms 内的内容变化
    renderTimer = setTimeout(() => {
      // 过滤掉 <think> 标签及其内容
      let content = newContent.replace(/<[\s]*think[\s\S]*?[\s]*\/[\s]*think[\s]*>/gi, '')
      content = content.replace(/<think>[\s\S]*?<\/think>/gi, '')
      
      // 渲染 Markdown
      renderedContent.value = md.render(content)
    }, 50) // 50ms 防抖
  },
  { immediate: true }
)
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
      class="max-w-[70%] px-4 py-2 rounded-2xl markdown-content"
      :class="[
        message.role === 'user' 
          ? 'bg-blue-500 text-white rounded-br-none' 
          : 'bg-gray-100 text-gray-800 rounded-bl-none'
      ]"
    >
      <div 
        class="markdown-body prose prose-sm max-w-none"
        :class="message.role === 'user' ? 'prose-invert' : ''"
        v-html="renderedContent"
      ></div>
      <span 
        class="text-xs mt-2 block opacity-70"
        :class="message.role === 'user' ? 'text-blue-100' : 'text-gray-500'"
      >
        {{ formatTime(message.timestamp) }}
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Markdown 容器基础样式 */
.markdown-body {
  word-wrap: break-word;
  overflow-wrap: break-word;
}

/* 代码块自定义样式（覆盖 prose 默认样式） */
.markdown-body :deep(.code-block) {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 1em 0;
}

.markdown-body :deep(.code-block code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.875em;
  line-height: 1.5;
  font-family: 'Courier New', Courier, monospace;
}

/* 深色背景下的代码块 */
.bg-blue-500 .markdown-body :deep(.code-block) {
  background-color: rgba(0, 0, 0, 0.3);
}
</style>
