# 样式单位与 CSS Reset 说明

## 📐 关于 rem 单位

### 什么是 rem？

```
rem = root em（相对于根元素 html 的字体大小）
默认：1rem = 16px（浏览器默认字体大小）
```

### Tailwind 为什么使用 rem？

| 单位 | 相对于 | 优点 | 缺点 |
|------|--------|------|------|
| **px** | 固定像素 | 精确、直观 | 不响应式 |
| **em** | 父元素字体大小 | 相对灵活 | 会嵌套累积 |
| **rem** | 根元素字体大小 | 一致性、响应式 | 需要理解基准 |

### Tailwind 的 rem 对应关系

```css
/* Tailwind 默认配置 */
.text-xs    → 0.75rem   (12px)
.text-sm    → 0.875rem  (14px)
.text-base  → 1rem      (16px)
.text-lg    → 1.125rem  (18px)
.text-xl    → 1.25rem   (20px)
.text-2xl   → 1.5rem    (24px)

.m-1  → 0.25rem  (4px)
.m-2  → 0.5rem   (8px)
.m-3  → 0.75rem  (12px)
.m-4  → 1rem     (16px)
```

### rem 的优势

#### 1. 响应用户设置
```css
/* 用户调整浏览器字体大小为 20px */
html { font-size: 20px; }

/* 所有 rem 自动放大 */
.text-base (1rem) = 20px  /* 原来是 16px */
.m-4 (1rem) = 20px        /* 原来是 16px */
```

#### 2. 无障碍友好
- 视障用户可以在浏览器中设置更大的字体
- 使用 rem 的页面会自动适配
- 使用 px 的页面不会响应

#### 3. 保持一致性
```css
/* 整个项目使用统一的基准 */
间距: 0.25rem, 0.5rem, 1rem, 1.5rem...
字体: 0.75rem, 0.875rem, 1rem, 1.125rem...
```

---

## 🔄 CSS Reset 说明

### 为什么要 Reset？

浏览器会给 HTML 标签添加默认样式，导致跨浏览器不一致：

```css
/* 浏览器默认样式 */
h1 {
  font-size: 2em;        /* 很大！*/
  margin: 0.67em 0;      /* 有默认间距 */
  font-weight: bold;
}

ul {
  margin: 1em 0;
  padding-left: 40px;    /* 有默认缩进 */
  list-style-type: disc; /* 有默认列表样式 */
}

p {
  margin: 1em 0;         /* 有默认间距 */
}
```

### 我们已经实现的 CSS Reset

在 `src/style.css` 中，我们已经添加了完整的 Reset：

```css
/* ===== CSS Reset ===== */

/* 1. 全局重置 */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 2. 移除列表默认样式 */
ul, ol {
  list-style: none;
}

/* 3. 移除标题默认 margin 和字体大小 */
h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

/* 4. 移除段落默认 margin */
p {
  margin: 0;
}

/* 5. 移除表格默认样式 */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* 6. 移除按钮默认样式 */
button, input, select, textarea {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
}

button {
  cursor: pointer;
  background: none;
  border: none;
}

/* 7. 移除链接下划线 */
a {
  color: inherit;
  text-decoration: none;
}

/* 8. 移除图片默认间距 */
img, svg {
  display: block;
  max-width: 100%;
}
```

---

## 🎯 Markdown 内容中的样式处理

### 问题：Markdown 渲染的 HTML 标签会有默认样式

```html
<!-- Markdown 转换后 -->
<h1>标题</h1>    <!-- 浏览器默认: font-size: 2em, margin: 0.67em 0 -->
<p>段落</p>       <!-- 浏览器默认: margin: 1em 0 -->
<ul>             <!-- 浏览器默认: padding-left: 40px -->
  <li>项目</li>
</ul>
```

### 解决方案：为 Markdown 内容重新定义样式

在 `ChatMessage.vue` 中，我们为 `.markdown-body` 内的元素定义了精确的样式：

```css
.markdown-body :deep(h1) {
  font-size: 1.5em;      /* 相对于父元素 14px → 21px */
  font-weight: 600;
  margin-top: 1em;       /* 21px */
  margin-bottom: 0.5em;  /* 10.5px */
}

.markdown-body :deep(p) {
  margin-bottom: 0.75em;  /* 相对于 14px → 10.5px */
  line-height: 1.6;
}

.markdown-body :deep(ul) {
  margin-left: 1.5em;    /* 恢复列表缩进 */
  margin-bottom: 0.75em;
  list-style: disc;      /* 恢复列表样式 */
}
```

---

## 📊 em vs rem 在 Markdown 中的使用

### 当前项目的策略

| 位置 | 使用单位 | 原因 |
|------|---------|------|
| **全局布局** | rem (Tailwind) | 响应式、一致性 |
| **Markdown 内容** | em | 相对于父元素字体大小 |

### 为什么 Markdown 用 em？

```css
/* 使用 em - 相对于父元素 */
.markdown-body {
  font-size: 14px;
}

.markdown-body h1 {
  font-size: 1.5em;  /* 14px × 1.5 = 21px */
  margin-top: 1em;   /* 21px（相对于自己的字体大小）*/
}

/* 如果改成 rem - 相对于根元素 */
.markdown-body h1 {
  font-size: 1.3125rem;  /* 21px ÷ 16px = 1.3125rem（难算！）*/
  margin-top: 1.3125rem; /* 21px ÷ 16px = 1.3125rem */
}
```

**优势**：
- ✅ em 更容易计算（相对于父元素 14px）
- ✅ 修改父元素字体时，所有子元素自动调整
- ✅ 更适合组件化的局部样式

---

## 🛠️ 实践建议

### 1. 全局布局使用 Tailwind（rem）
```vue
<template>
  <div class="p-4 m-2 text-base">
    <!-- p-4 = 1rem = 16px -->
    <!-- text-base = 1rem = 16px -->
  </div>
</template>
```

### 2. Markdown 内容使用 em
```css
.markdown-body {
  font-size: 14px;  /* 基准 */
}

.markdown-body h1 {
  font-size: 1.5em;  /* 21px */
  margin: 1em 0;     /* 21px 0 */
}
```

### 3. 需要精确控制时使用 px
```css
.code-block {
  border-radius: 6px;  /* 圆角不需要响应式 */
  padding: 16px;       /* 固定内边距 */
}
```

---

## ✅ 总结

### 当前项目的样式策略

1. **全局 Reset** ✅ - 已移除所有浏览器默认样式
2. **Tailwind 工具类** ✅ - 使用 rem 实现响应式布局
3. **Markdown 样式** ✅ - 使用 em 实现组件内相对大小
4. **特殊场景** ✅ - 使用 px 实现精确控制

### 要不要去掉标签默认样式？

**答案：是的，已经去掉了！** ✅

- 全局 CSS Reset 已移除所有默认 margin/padding
- Markdown 内容重新定义了精确的间距
- 列表、标题、段落都有统一的样式

### rem vs px 的选择

| 场景 | 推荐单位 | 原因 |
|------|---------|------|
| 全局布局 | rem (Tailwind) | 响应式、无障碍 |
| 组件内部 | em | 相对父元素、易计算 |
| 精确控制 | px | 固定大小、不需要响应式 |

---

## 🔍 查看当前配置

- **全局 Reset**: [src/style.css](../src/style.css)
- **Markdown 样式**: [src/components/ChatMessage.vue](../src/components/ChatMessage.vue)
- **Tailwind 配置**: [tailwind.config.js](../tailwind.config.js)
