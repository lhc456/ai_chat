# Markdown 渲染方案对比

## 方案总览

当前项目使用的是 **marked + v-html**，但也有其他可选方案。

---

## 方案 A：marked + v-html（当前使用）

### 实现方式
```typescript
import { marked } from 'marked'
const renderedContent = marked(content)
```
```vue
<div v-html="renderedContent"></div>
```

### 优点
- 实现简单，代码量少
- 功能完整，支持所有 Markdown 语法
- 性能好，渲染快速
- 社区成熟，稳定可靠

### 缺点
- 使用 v-html 可能有 XSS 风险（但 AI 生成的内容相对安全）
- 无法细粒度控制每个元素
- 样式需要自己编写

### 安全评分
⭐⭐⭐⭐（AI 生成的内容可信度高）

---

## 方案 B：markdown-it + v-html（备选方案）

### 实现方式
```typescript
import MarkdownIt from 'markdown-it'

const md = new MarkdownIt({
  html: false,        // 禁用 HTML 标签，更安全
  breaks: true,
  linkify: true,
})

const renderedContent = md.render(content)
```

### 优点
- 可以禁用 HTML 标签，更安全
- 支持自定义渲染规则
- 插件生态丰富（代码高亮、数学公式等）
- 性能优秀

### 缺点
- 仍然使用 v-html
- 配置相对复杂

### 安全评分
⭐⭐⭐⭐⭐

---

## 方案 C：Vue 组件化渲染（最安全）

### 实现方式
将 Markdown 解析为 Vue 虚拟 DOM，不使用 v-html

```typescript
import { h } from 'vue'

function renderToVNode(content: string) {
  // 解析 Markdown 为 tokens
  // 转换为 Vue VNodes
  return h('div', [...vnodes])
}
```

### 优点
- 最安全，完全不使用 v-html
- 可以自定义每个组件
- 符合 Vue 理念
- 可以添加交互（如复制代码按钮）

### 缺点
- 实现复杂，代码量大
- 需要自己解析 Markdown
- 维护成本高

### 安全评分
⭐⭐⭐⭐⭐⭐

---

## 方案 D：纯 CSS 方案（最简单）

### 实现方式
不解析 Markdown，直接用 CSS 美化等宽文本

```vue
<pre class="markdown-text">{{ content }}</pre>
```

```css
.markdown-text {
  white-space: pre-wrap;
  font-family: monospace;
}
```

### 优点
- 零依赖
- 性能最好
- 最简单

### 缺点
- 只支持基础格式
- 无法渲染代码块高亮、表格等
- 体验较差

### 安全评分
⭐⭐⭐⭐⭐

---

## 📊 对比表格

| 方案 | 安全性 | 实现难度 | 功能完整性 | 性能 | 推荐度 |
|------|--------|---------|-----------|------|--------|
| marked + v-html | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| markdown-it + v-html | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Vue 组件化 | ⭐⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| 纯 CSS | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |

---

## 🎯 推荐方案

### 对于 AI 聊天场景

**推荐：markdown-it + v-html**

**原因**：
1. AI 生成的内容可信度高，XSS 风险低
2. 可以禁用 HTML 标签提高安全性
3. 实现简单，维护成本低
4. 功能完整，支持所有常用 Markdown 语法
5. 可以通过插件扩展功能

### 对安全性要求极高的场景

**推荐：Vue 组件化渲染**

**适用**：
- 用户生成内容（UGC）
- 公开论坛
- 评论区

---

## 💡 如何切换方案

### 当前：marked
```typescript
import { marked } from 'marked'
return marked(content)
```

### 切换到：markdown-it
```typescript
import MarkdownIt from 'markdown-it'
const md = new MarkdownIt({ html: false, breaks: true })
return md.render(content)
```

### 切换到：纯 CSS
```vue
<pre class="raw-markdown">{{ content }}</pre>
```

---

## 🔒 安全建议

如果继续使用 v-html：

1. **禁用 HTML 标签**
   ```typescript
   const md = new MarkdownIt({ html: false })
   ```

2. **使用 DOMPurify 清理 HTML**
   ```bash
   npm install dompurify @types/dompurify
   ```
   ```typescript
   import DOMPurify from 'dompurify'
   const safeHtml = DOMPurify.sanitize(marked(content))
   ```

3. **设置 Content Security Policy**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self'">
   ```

---

## 📝 总结

| 场景 | 推荐方案 |
|------|---------|
| AI 聊天（当前项目） | markdown-it + v-html ✅ |
| 技术博客 | marked + v-html |
| 文档网站 | markdown-it + 插件 |
| UGC 平台 | Vue 组件化 |
| 简单展示 | 纯 CSS |

**当前项目最佳选择**：继续使用 v-html，但建议切换到 markdown-it 并禁用 HTML 标签。
