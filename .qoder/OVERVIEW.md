# AI Chat & Document Assistant - Agent & Skill 总览

## 📁 文件结构

```
.qoder/
├── agents/                          # Agent 配置目录
│   ├── ai-chat-agent.json          # 主 Agent 配置文件
│   └── AGENT-CONFIG.md             # Agent 配置说明文档
│
└── skills/                          # Skill 技能目录
    ├── ai-chat-document.md         # 核心技能定义
    ├── USAGE-GUIDE.md              # 使用指南
    └── EXAMPLES.md                 # 使用示例
```

---

## 🤖 Agent 配置

### 主 Agent: AI Chat & Document Assistant

**文件**: `.qoder/agents/ai-chat-agent.json`

**核心能力**:
- ✅ 多轮对话支持
- ✅ 文档理解与分析
- ✅ 文本提取
- ✅ 代码辅助
- ✅ 智能问答

**配置参数**:
```json
{
  "model": "llama2",
  "temperature": 0.7,
  "max_tokens": 2000,
  "context_window": 4096
}
```

---

## 🎯 Skills 技能

### 1. 核心技能 (ai-chat-document.md)
**功能**: 定义 AI 聊天和文档识别的核心能力

**主要特性**:
- 智能聊天（多轮对话、意图识别）
- 文档识别（文本提取、格式分析、内容摘要）
- 代码辅助（编写、解释、调试）

### 2. 使用指南 (USAGE-GUIDE.md)
**内容**:
- 快速开始教程
- 各功能详细使用说明
- 高级技巧和最佳实践
- 常见问题解答
- 扩展功能开发指南

### 3. 使用示例 (EXAMPLES.md)
**包含场景**:
1. 代码解释与优化
2. 文档内容分析
3. 错误调试
4. 技术方案对比
5. 配置文件解释

---

## 🚀 快速使用

### 1. 启动应用
```bash
cd /Users/lihanchao/Documents/other/ai
npm run dev
```

### 2. 打开浏览器
访问: http://localhost:3000

### 3. 开始使用
- 选择模型
- 输入问题或粘贴文档
- 获取 AI 回复

---

## 💡 典型使用场景

### 场景 1: 代码开发辅助
```
用户: 帮我写一个 Vue3 组件，实现防抖搜索框
AI: [提供完整的组件代码和使用说明]
```

### 场景 2: 文档分析
```
用户: [粘贴 package.json] 请分析这个项目的依赖
AI: [详细分析依赖关系和技术栈]
```

### 场景 3: 错误调试
```
用户: TypeError: Cannot read properties of undefined
AI: [分析错误原因并提供解决方案]
```

### 场景 4: 技术学习
```
用户: Vue3 的 Composition API 怎么用？
AI: [详细解释 + 代码示例 + 最佳实践]
```

---

## 🔧 自定义配置

### 修改 Agent 参数

编辑 `.qoder/agents/ai-chat-agent.json`:

```json
{
  "temperature": 0.5,  // 降低创造性，更准确
  "max_tokens": 3000,  // 增加输出长度
  "model": "qwen2"     // 更换模型
}
```

### 创建专用 Agent

参考 `AGENT-CONFIG.md` 中的示例，创建专门的：
- 代码助手 Agent
- 文档分析 Agent
- 学习导师 Agent

---

## 📊 功能对比

| 功能 | 基础聊天 | 文档识别 | 代码辅助 |
|------|---------|---------|---------|
| 多轮对话 | ✅ | ✅ | ✅ |
| 上下文记忆 | ✅ | ✅ | ✅ |
| 代码高亮 | ❌ | ❌ | ❌ |
| 文件上传 | ❌ | ❌ | ❌ |
| Markdown 渲染 | ❌ | ❌ | ❌ |

**注**: 标记 ❌ 的功能可以通过扩展开发实现

---

## 🎓 最佳实践

### 1. 提问技巧
- ✅ 提供完整上下文
- ✅ 明确具体需求
- ✅ 分步骤提问
- ❌ 模糊笼统的问题

### 2. 文档处理
- 大文档分段处理
- 明确指出关注点
- 说明分析目的

### 3. 代码相关
- 提供完整代码片段
- 说明运行环境
- 描述预期行为

---

## 🔮 未来扩展

### 计划添加的功能
- [ ] 文件上传（拖拽上传）
- [ ] PDF 文档解析
- [ ] 图片 OCR 识别
- [ ] 代码语法高亮
- [ ] Markdown 实时渲染
- [ ] 对话历史保存
- [ ] 导出对话记录
- [ ] 多模型并行对比

### 扩展开发指南
详见 `USAGE-GUIDE.md` 中的"扩展功能开发指南"章节

---

## 📞 支持与反馈

### 获取帮助
1. 查看 `USAGE-GUIDE.md`
2. 参考 `EXAMPLES.md` 中的示例
3. 阅读 `AGENT-CONFIG.md` 了解配置

### 提交问题
- Bug 报告
- 功能建议
- 使用问题

---

## 📝 更新日志

### v1.0.0 (当前版本)
- ✅ 创建主 Agent 配置
- ✅ 实现核心技能定义
- ✅ 编写使用指南
- ✅ 提供使用示例
- ✅ Agent 配置说明文档

### 待开发
- [ ] 更多专用 Agent
- [ ] 自动化测试用例
- [ ] 性能优化方案
- [ ] 国际化支持

---

## 🎯 下一步行动

1. **立即体验**
   ```bash
   npm run dev
   ```

2. **阅读文档**
   - 先看 `skills/USAGE-GUIDE.md`
   - 再看 `skills/EXAMPLES.md`
   - 需要配置时看 `agents/AGENT-CONFIG.md`

3. **开始使用**
   - 尝试基础聊天
   - 测试文档分析
   - 体验代码辅助

4. **根据需要调整**
   - 修改 Agent 参数
   - 创建专用 Agent
   - 扩展新功能

---

**祝你使用愉快！** 🎉
