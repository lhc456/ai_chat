# AI Chat Agent 使用指南

## 📖 快速开始

### 1. 启动应用
```bash
npm run dev
```
访问 http://localhost:3000

### 2. 选择模型
在页面顶部选择已下载的 Ollama 模型（如 llama2、qwen 等）

### 3. 开始对话
在输入框中输入问题，按 Enter 或点击"发送"按钮

---

## 💬 AI 聊天功能

### 基础对话
```
你：你好！
AI：你好！有什么我可以帮助你的吗？
```

### 代码相关
```
你：用 JavaScript 写一个快速排序
AI：[提供代码示例和解释]
```

### 技术咨询
```
你：Vue3 和 Vue2 的主要区别是什么？
AI：[详细对比分析]
```

### 多轮对话
```
你：什么是 TypeScript？
AI：[解释 TypeScript]

你：它和 JavaScript 有什么关系？
AI：[基于上下文继续解释]
```

---

## 📄 文档识别功能

### 分析代码文件
```
你：[粘贴代码] 这段代码有什么问题？
AI：[分析代码问题并提供改进建议]
```

### 文档理解
```
你：[粘贴文档内容] 请总结这个文档的要点
AI：[提取关键信息并生成摘要]
```

### 配置解析
```
你：[粘贴配置文件] 这个配置是什么意思？
AI：[逐项解释配置参数]
```

---

## 🎯 高级技巧

### 1. 提供上下文
❌ 不好的提问：
```
它怎么工作？
```

✅ 好的提问：
```
我在使用 Vue3 的 ref 函数，它怎么工作？能举个例子吗？
```

### 2. 分步处理复杂问题
```
第1步：这个算法的思路是什么？
第2步：能帮我优化一下性能吗？
第3步：添加错误处理
```

### 3. 指定输出格式
```
请用表格对比这两种方案
请用代码示例说明
请分步骤解释
```

---

## ⚙️ 配置说明

### 模型选择
- **llama2**：通用对话，中英文支持好
- **qwen2**：中文能力强，适合技术问答
- **codellama**：代码相关任务
- **mistral**：轻量级，响应快

### 参数调整
在 `.env` 文件中可以配置：
```env
VITE_OLLAMA_URL=http://localhost:11434
```

---

## 🔧 常见问题

### Q: 模型回复很慢怎么办？
A: 
1. 选择更轻量的模型（如 qwen2:7b）
2. 确保电脑有足够内存
3. 首次加载会慢，后续会快一些

### Q: 文档太长怎么办？
A:
1. 分段发送，每次发送一个章节
2. 先让 AI 总结大纲，再针对具体部分提问
3. 使用"请只看第 X 段"这样的限定

### Q: 如何保存对话历史？
A:
目前对话保存在浏览器内存中，刷新页面会清空。
未来可以扩展：
- 本地存储（localStorage）
- 导出为 Markdown 文件
- 数据库持久化

### Q: 代码高亮和格式化？
A:
AI 回复中的代码块会使用 Markdown 格式：
\`\`\`javascript
const x = 1;
\`\`\`
可以后续添加代码高亮插件。

---

## 🚀 扩展功能开发指南

### 添加新功能
1. 在 `src/components/` 创建新组件
2. 在 `src/stores/chatStore.ts` 添加状态管理
3. 在 `src/api/ollama.ts` 扩展 API 调用

### 示例：添加文件上传
```typescript
// src/components/FileUpload.vue
<template>
  <input type="file" @change="handleFileUpload" />
</template>

<script setup>
function handleFileUpload(event) {
  const file = event.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    const content = e.target.result
    // 发送到 AI 进行分析
  }
  reader.readAsText(file)
}
</script>
```

---

## 📊 性能优化建议

### 1. 流式输出优化
- 已实现流式输出，用户体验更好
- 逐字显示，减少等待焦虑

### 2. 内存管理
- 对话历史过长时可以手动清空
- 后续可添加分页或懒加载

### 3. 响应速度
- 使用轻量级模型
- 减少不必要的上下文
- 合理设置 max_tokens

---

## 🤝 贡献指南

欢迎提交 PR 或 Issue！

### 开发流程
1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

---

## 📝 更新日志

### v1.0.0 (当前版本)
- ✅ 基础聊天功能
- ✅ 流式输出
- ✅ 模型切换
- ✅ 文档内容分析
- ✅ 代码辅助

### 计划中
- [ ] 文件上传功能
- [ ] 对话历史保存
- [ ] 代码高亮显示
- [ ] Markdown 渲染
- [ ] 图片识别（OCR）
- [ ] PDF 解析

---

## 📞 获取帮助

遇到问题？
1. 查看 [README.md](../README.md)
2. 检查 Ollama 服务状态
3. 查看浏览器控制台错误信息
4. 提交 Issue
