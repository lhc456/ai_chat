<script setup lang="ts">
import { computed, h } from 'vue'
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
  
  return `<pre class="code-block"><code class="language-${lang}">${escapeHtml(code)}</code></pre>`
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

// 过滤 think 标签并渲染 Markdown
const renderedContent = computed(() => {
  if (!props.message.content) return ''
  
  // 过滤掉 <think> 标签及其内容
  let content = props.message.content.replace(/<think>[\s\S]*?<\/think>/g, '')
  
  // 渲染 Markdown
  return md.render(content)
})
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
        class="markdown-body whitespace-pre-wrap break-words"
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
/* Markdown 内容样式 */
.markdown-body {
  font-size: 14px;
  line-height: 1.6;
}

.markdown-body :deep(h1),
.markdown-body :deep(h2),
.markdown-body :deep(h3),
.markdown-body :deep(h4),
.markdown-body :deep(h5),
.markdown-body :deep(h6) {
  margin-top: 1em;
  margin-bottom: 0.5em;
  font-weight: 600;
  line-height: 1.3;
}

.markdown-body :deep(h1) { font-size: 1.5em; }
.markdown-body :deep(h2) { font-size: 1.3em; }
.markdown-body :deep(h3) { font-size: 1.1em; }

.markdown-body :deep(p) {
  margin-bottom: 0.75em;
  line-height: 1.6;
}

.markdown-body :deep(ul),
.markdown-body :deep(ol) {
  margin-left: 1.5em;
  margin-bottom: 0.75em;
}

.markdown-body :deep(li) {
  margin-bottom: 0.25em;
}

/* 行内代码 */
.markdown-body :deep(code) {
  background-color: rgba(0, 0, 0, 0.06);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
  font-family: 'Courier New', Courier, monospace;
}

/* 代码块 */
.markdown-body :deep(.code-block) {
  background-color: #1e1e1e;
  color: #d4d4d4;
  padding: 1em;
  border-radius: 6px;
  overflow-x: auto;
  margin: 0.75em 0;
  position: relative;
}

.markdown-body :deep(.code-block code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
  font-size: 0.9em;
  line-height: 1.5;
  font-family: 'Courier New', Courier, monospace;
}

/* 引用块 */
.markdown-body :deep(blockquote) {
  border-left: 4px solid #d1d5db;
  padding-left: 1em;
  margin: 0.75em 0;
  color: #6b7280;
  font-style: italic;
}

/* 表格 */
.markdown-body :deep(table) {
  border-collapse: collapse;
  width: 100%;
  margin: 0.75em 0;
  overflow-x: auto;
  display: block;
}

.markdown-body :deep(th),
.markdown-body :deep(td) {
  border: 1px solid #d1d5db;
  padding: 0.5em;
  text-align: left;
}

.markdown-body :deep(th) {
  background-color: #f3f4f6;
  font-weight: 600;
}

/* 链接 */
.markdown-body :deep(a) {
  color: #3b82f6;
  text-decoration: underline;
}

.markdown-body :deep(a:hover) {
  color: #2563eb;
}

/* 分隔线 */
.markdown-body :deep(hr) {
  border: none;
  border-top: 2px solid #e5e7eb;
  margin: 1em 0;
}

/* 图片 */
.markdown-body :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 6px;
  margin: 0.75em 0;
}

/* 深色背景下的样式（用户消息） */
.bg-blue-500 .markdown-body :deep(code) {
  background-color: rgba(255, 255, 255, 0.2);
  color: inherit;
}

.bg-blue-500 .markdown-body :deep(.code-block) {
  background-color: rgba(0, 0, 0, 0.3);
}

.bg-blue-500 .markdown-body :deep(blockquote) {
  border-left-color: rgba(255, 255, 255, 0.5);
  color: rgba(255, 255, 255, 0.8);
}

.bg-blue-500 .markdown-body :deep(a) {
  color: #bfdbfe;
}

.bg-blue-500 .markdown-body :deep(th) {
  background-color: rgba(255, 255, 255, 0.2);
}

.bg-blue-500 .markdown-body :deep(td),
.bg-blue-500 .markdown-body :deep(th) {
  border-color: rgba(255, 255, 255, 0.3);
}
</style>
