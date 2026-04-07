# Agent 配置说明

## 📋 Agent 配置文件结构

当前项目的 agent 配置文件位于：`.qoder/agents/ai-chat-agent.json`

### 配置项说明

```json
{
  "name": "AI Chat & Document Assistant",
  "description": "专业的 AI 聊天和文档识别助手...",
  "model": "llama2",
  "instructions": "你是一个专业的 AI 助手...",
  "capabilities": [...],
  "temperature": 0.7,
  "max_tokens": 2000,
  "context_window": 4096
}
```

### 各字段含义

| 字段 | 类型 | 说明 | 示例值 |
|------|------|------|--------|
| `name` | string | Agent 名称 | "AI Chat Assistant" |
| `description` | string | Agent 描述信息 | "专业的聊天助手" |
| `model` | string | 使用的 Ollama 模型 | "llama2", "qwen2" |
| `instructions` | string | Agent 行为指令 | 详细的系统提示词 |
| `capabilities` | array | 能力列表 | ["chat", "document"] |
| `temperature` | number | 创造性程度 (0-1) | 0.7 |
| `max_tokens` | number | 最大输出 token 数 | 2000 |
| `context_window` | number | 上下文窗口大小 | 4096 |

---

## 🎯 参数调优指南

### Temperature（创造性）

```
0.0 - 0.3: 精确、确定性回答
  适用：代码生成、技术问答
  
0.4 - 0.7: 平衡创造性和准确性
  适用：日常对话、文档分析
  
0.8 - 1.0: 高创造性
  适用：创意写作、头脑风暴
```

**建议**：
- 代码相关任务：`0.2 - 0.4`
- 文档分析：`0.5 - 0.7`
- 创意内容：`0.7 - 0.9`

### Max Tokens（输出长度）

```
500 - 1000:  简短回答
1000 - 2000: 中等长度，适合大部分场景
2000 - 4000: 详细回答
4000+:       长篇分析
```

**建议**：
- 简单问答：`1000`
- 代码解释：`2000`
- 文档分析：`3000`

### Context Window（上下文）

```
2048:  短期记忆，适合单轮对话
4096:  标准配置，支持多轮对话
8192+: 长期记忆，适合复杂任务
```

---

## 🔧 自定义 Agent

### 创建专用 Agent

#### 1. 代码助手 Agent
```json
{
  "name": "Code Assistant",
  "description": "专业编程助手，擅长代码编写、优化和调试",
  "model": "codellama",
  "instructions": "你是一个专业的编程助手，专注于：\n1. 代码编写和优化\n2. Bug 调试\n3. 性能优化\n4. 代码审查",
  "capabilities": ["code-generation", "debugging", "optimization", "review"],
  "temperature": 0.2,
  "max_tokens": 3000
}
```

#### 2. 文档分析 Agent
```json
{
  "name": "Document Analyzer",
  "description": "专业文档分析助手",
  "model": "qwen2",
  "instructions": "你是一个文档分析专家，擅长：\n1. 文档内容提取\n2. 关键信息识别\n3. 摘要生成\n4. 格式分析",
  "capabilities": ["document-analysis", "text-extraction", "summarization"],
  "temperature": 0.5,
  "max_tokens": 4000
}
```

#### 3. 学习导师 Agent
```json
{
  "name": "Learning Tutor",
  "description": "耐心细致的学习导师",
  "model": "llama2",
  "instructions": "你是一个耐心的学习导师，擅长：\n1. 概念解释\n2. 举例说明\n3. 循序渐进教学\n4. 鼓励式引导",
  "capabilities": ["teaching", "explaining", "mentoring"],
  "temperature": 0.7,
  "max_tokens": 2000
}
```

---

## 📝 配置最佳实践

### 1. 根据任务选择模型

| 任务类型 | 推荐模型 | 原因 |
|---------|---------|------|
| 通用对话 | llama2 | 中英文均衡 |
| 中文任务 | qwen2 | 中文能力强 |
| 代码相关 | codellama | 代码理解好 |
| 快速响应 | mistral | 轻量快速 |

### 2. 优化 Instructions

❌ **不好的指令**：
```json
"instructions": "你是个助手"
```

✅ **好的指令**：
```json
"instructions": "你是一个专业的技术助手，专注于：\n1. 提供准确的技术解答\n2. 给出可运行的代码示例\n3. 解释原理而不只是答案\n4. 指出潜在问题和最佳实践"
```

### 3. 合理设置 Capabilities

根据实际需求添加能力：
```json
"capabilities": [
  "multi-turn-conversation",  // 多轮对话
  "document-understanding",   // 文档理解
  "code-assistance",          // 代码辅助
  "text-extraction",          // 文本提取
  "question-answering"        // 问答
]
```

---

## 🚀 高级配置

### 添加系统提示词模板

```json
{
  "system_prompt_template": "你是 {name}，一个专注于 {capabilities} 的 AI 助手。请根据用户的问题提供专业、准确的回答。"
}
```

### 配置上下文管理

```json
{
  "context_management": {
    "max_history": 10,
    "summarize_threshold": 5,
    "enable_memory": true
  }
}
```

---

## 📊 监控和优化

### 性能指标
- **响应时间**：理想 < 2s
- **准确率**：目标 > 85%
- **用户满意度**：通过反馈收集

### 优化建议
1. 根据用户反馈调整 temperature
2. 分析常见问题优化 instructions
3. 定期更新模型版本
4. 监控 token 使用情况

---

## 🔍 调试技巧

### 1. 测试不同参数效果
```bash
# 测试不同 temperature
temperature: 0.2 -> 观察回答是否过于死板
temperature: 0.7 -> 观察回答是否合适
temperature: 0.9 -> 观察是否过于发散
```

### 2. 检查上下文长度
```bash
# 观察是否出现：
- 忘记前面的对话 -> context_window 太小
- 响应变慢 -> context_window 太大
```

### 3. 验证模型选择
```bash
# 同一问题用不同模型测试
llama2: 通用性如何？
qwen2: 中文理解如何？
codellama: 代码能力如何？
```

---

## 📚 参考资源

- [Ollama 模型库](https://ollama.ai/library)
- [模型对比](https://github.com/ollama/ollama#model-library)
- [Prompt 工程指南](https://www.promptingguide.ai/)
