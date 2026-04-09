# AI Loading 状态与中文回复功能

## ✨ 新增功能

### 1. AI Loading 状态指示器

#### 功能说明
当用户发送消息后，在 AI 开始回复之前，会显示一个 "AI 正在思考..." 的加载动画。

#### 显示时机
```
用户发送消息 
  → 显示 Loading 动画
  → 收到第一个字符
  → 隐藏 Loading，显示消息内容
```

#### 视觉效果
```
┌─────────────────────────────────┐
│  🤖  [● ● ●]  AI 正在思考...   │
└─────────────────────────────────┘
```

- 紫色机器人头像
- 三个跳动的圆点动画
- "AI 正在思考..." 文字提示

---

### 2. 强制中文回复

#### 实现方式

**方式 1：System Prompt（系统提示）**
在 API 调用时添加系统级指令：

```typescript
body: JSON.stringify({
  model,
  prompt,
  stream: true,
  system: '你是一个专业的AI助手。请始终使用中文（简体）回答所有问题。即使用户使用其他语言提问，也要用中文回答。',
})
```

**方式 2：Prompt 追加**
在用户消息后面追加语言要求：

```typescript
const promptWithLanguage = `${content}\n\n请用中文回答。`
```

#### 双重保障
- ✅ System Prompt 设置全局语言偏好
- ✅ 每条消息都追加语言要求
- ✅ 最大化确保 AI 使用中文回复

---

## 📍 代码修改位置

### 1. Loading 状态显示

**文件**: [src/App.vue](../src/App.vue#L65-L81)

```vue
<!-- AI Loading 状态 - 在等待第一个字符时显示 -->
<div v-if="store.isLoading && store.messages.length > 0 && !store.messages[store.messages.length - 1]?.content" class="flex gap-3 mb-4">
  <div class="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center flex-shrink-0">
    <span class="text-white text-sm">🤖</span>
  </div>
  <div class="px-4 py-2 bg-gray-100 rounded-2xl rounded-bl-none">
    <div class="flex items-center gap-2">
      <div class="flex gap-1">
        <span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: -0.3s;"></span>
        <span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style="animation-delay: -0.15s;"></span>
        <span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
      </div>
      <span class="text-sm text-gray-500">AI 正在思考...</span>
    </div>
  </div>
</div>
```

**显示条件**:
- `store.isLoading` = true（正在加载）
- `store.messages.length > 0`（已有消息）
- `!store.messages[store.messages.length - 1]?.content`（最后一条消息内容为空）

---

### 2. 中文回复强制

**文件 1**: [src/api/ollama.ts](../src/api/ollama.ts#L45-L48)

```typescript
body: JSON.stringify({
  model,
  prompt,
  stream: true,
  // 添加系统提示，强制使用中文
  system: '你是一个专业的AI助手。请始终使用中文（简体）回答所有问题。即使用户使用其他语言提问，也要用中文回答。',
})
```

**文件 2**: [src/stores/chatStore.ts](../src/stores/chatStore.ts#L51-L52)

```typescript
// 添加中文提示，强制 AI 使用中文回复
const promptWithLanguage = `${content}\n\n请用中文回答。`

// 使用流式输出
for await (const chunk of generateStreamResponse(promptWithLanguage, currentModel.value)) {
  // ...
}
```

---

### 3. Loading 动画样式

**文件**: [src/style.css](../src/style.css#L108-L137)

```css
/* Loading 动画 */
@keyframes bounce {
  0%, 100% {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
```

---

## 🎯 用户体验流程

### 完整交互流程

```
1. 用户输入消息
   ↓
2. 点击发送
   ↓
3. 用户消息立即显示在右侧
   ↓
4. 显示 "AI 正在思考..." Loading 动画
   ↓
5. 等待 Ollama 响应...
   ↓
6. 收到第一个字符
   ↓
7. Loading 动画消失
   ↓
8. AI 消息逐字显示（流式输出）
   ↓
9. 完整回复完成
```

---

## 🔍 状态管理

### Store 状态说明

```typescript
// src/stores/chatStore.ts

isLoading: ref(false)    // 是否在加载（等待响应）
isStreaming: ref(false)  // 是否在流式输出（接收数据）
```

### 状态变化时序

| 时间点 | isLoading | isStreaming | 显示内容 |
|--------|-----------|-------------|---------|
| 发送前 | false | false | 输入框 |
| 发送后 | true | true | Loading 动画 |
| 收到第一个字符 | true | true | AI 消息（逐字） |
| 接收完成 | false | false | 完整消息 |
| 出错 | false | false | 错误提示 |

---

## 💡 优化建议

### 1. Loading 文案自定义

可以修改为其他提示文字：

```vue
<span class="text-sm text-gray-500">AI 正在思考...</span>
<!-- 改为 -->
<span class="text-sm text-gray-500">正在生成回复...</span>
<span class="text-sm text-gray-500">AI 处理中...</span>
```

### 2. 添加超时提示

如果等待时间过长（如 > 30秒），可以显示额外提示：

```typescript
// 在 store 中添加
const loadingStartTime = ref(0)

async function sendMessage(content: string) {
  loadingStartTime.value = Date.now()
  // ...
  
  // 在组件中检查
  const loadingDuration = Date.now() - loadingStartTime.value
  if (loadingDuration > 30000) {
    // 显示 "等待时间较长，请耐心等待..."
  }
}
```

### 3. 添加取消按钮

允许用户取消正在进行的请求：

```vue
<button v-if="store.isLoading" @click="cancelRequest" class="cancel-btn">
  取消
</button>
```

---

## 🧪 测试场景

### 测试 Loading 状态

1. **正常场景**
   - 发送消息
   - 观察是否显示 "AI 正在思考..."
   - 收到回复后 Loading 是否消失

2. **慢速场景**
   - 使用大型模型（如 llama2:70b）
   - 观察 Loading 动画是否持续显示
   - 确认不会卡顿

3. **错误场景**
   - 关闭 Ollama 服务
   - 发送消息
   - 观察是否显示错误提示

### 测试中文回复

1. **中文提问**
   ```
   用户：你好
   AI：你好！（中文）✅
   ```

2. **英文提问**
   ```
   用户：Hello
   AI：你好！（中文）✅
   ```

3. **混合提问**
   ```
   用户：What 是 Vue?
   AI：Vue 是...（中文）✅
   ```

---

## 🎨 样式定制

### 修改 Loading 颜色

```css
/* 紫色主题 */
.bg-purple-500 { background-color: #8b5cf6; }

/* 改为蓝色主题 */
.bg-blue-500 { background-color: #3b82f6; }

/* 改为绿色主题 */
.bg-green-500 { background-color: #10b981; }
```

### 修改动画速度

```css
.animate-bounce {
  animation: bounce 1s infinite;  /* 改为 0.5s 更快 */
}
```

### 修改跳动点数量

```vue
<!-- 3 个点 -->
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>

<!-- 改为 4 个点 -->
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
<span class="w-2 h-2 bg-purple-500 rounded-full animate-bounce"></span>
```

---

## 📊 效果对比

### 修改前
```
用户发送 → 等待...（无任何提示）→ 突然显示 AI 回复
```
**问题**：
- ❌ 用户不知道是否发送成功
- ❌ 等待过程焦虑
- ❌ 可能重复发送

### 修改后
```
用户发送 → "AI 正在思考..." → 逐字显示回复
```
**优势**：
- ✅ 明确的视觉反馈
- ✅ 减少用户焦虑
- ✅ 提升用户体验
- ✅ 强制中文回复

---

## 🔗 相关文件

- [App.vue](../src/App.vue) - Loading 状态显示
- [chatStore.ts](../src/stores/chatStore.ts) - 状态管理和中文提示
- [ollama.ts](../src/api/ollama.ts) - API 系统提示
- [style.css](../src/style.css) - Loading 动画样式

---

## ✅ 总结

### 已实现功能
1. ✅ AI Loading 状态指示器
2. ✅ 跳动的圆点动画
3. ✅ "AI 正在思考..." 文字提示
4. ✅ 强制中文回复（双重保障）
5. ✅ 流畅的用户体验

### 用户体验提升
- 等待时间有明确反馈
- 不再出现突然的回复
- 减少用户焦虑和重复发送
- 统一使用中文交流

刷新浏览器即可看到新的 Loading 效果和中文回复！🎉
