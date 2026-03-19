# AI Chat - Ollama 聊天应用

一个基于 Vue3 + TypeScript 构建的现代化 AI 聊天应用，使用本地 Ollama 模型进行智能对话。

## ✨ 特性

- 🚀 **Vue3 Composition API** - 现代化的组件开发模式
- 💪 **TypeScript** - 完整的类型支持
- 🎨 **Tailwind CSS** - 美观的响应式 UI 设计
- ⚡ **流式输出** - 实时打字机效果的回复体验
- 🔄 **模型切换** - 支持切换不同的 Ollama 模型
- 📱 **响应式设计** - 完美适配移动端和桌面端
- 🎯 **Pinia 状态管理** - 轻量高效的状态管理方案

## 📋 前置要求

在开始之前，请确保已安装以下内容：

- **Node.js 18+** - [下载地址](https://nodejs.org/)
- **Ollama** - [下载地址](https://ollama.ai/)
- **至少一个 Ollama 模型**（如 llama2）

### 安装 Ollama 并下载模型

```bash
# 1. 访问 https://ollama.ai/ 下载并安装 Ollama

# 2. 安装完成后，在终端运行以下命令下载模型
ollama pull llama2

# 你也可以下载其他模型
ollama pull mistral
ollama pull codellama
```

## 🚀 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 配置环境变量（可选）

项目已经包含默认的 `.env` 文件，如果 Ollama 运行在默认地址 `http://localhost:11434`，则无需修改。

如果需要自定义 Ollama 地址，可以复制 `.env.example` 创建 `.env` 文件：

```bash
cp .env.example .env
```

然后修改 `VITE_OLLAMA_URL` 为你的 Ollama 服务地址。

### 3. 启动开发服务器

```bash
npm run dev
```

应用将在 `http://localhost:3000` 启动。

### 4. 打开浏览器

访问 `http://localhost:3000` 即可开始使用。

## 📁 项目结构

```
ai_chat/
├── src/
│   ├── api/                  # API 接口层
│   │   └── ollama.ts         # Ollama API 封装
│   ├── components/           # Vue 组件
│   │   ├── ChatMessage.vue   # 消息气泡组件
│   │   ├── ChatInput.vue     # 输入框组件
│   │   ├── ModelSelector.vue # 模型选择器
│   │   └── TypingIndicator.vue # 打字指示器
│   ├── composables/          # 组合式函数
│   │   └── useChat.ts        # 聊天逻辑封装
│   ├── stores/               # Pinia Store
│   │   └── chatStore.ts      # 聊天状态管理
│   ├── types/                # TypeScript 类型
│   │   └── chat.ts           # 消息、模型等类型定义
│   ├── App.vue               # 主应用组件
│   ├── main.ts               # 应用入口
│   └── style.css             # 全局样式
├── .env                      # 环境变量
├── .env.example              # 环境变量示例
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

## 🛠️ 技术栈

- **前端框架**: Vue 3.4+
- **开发语言**: TypeScript 5.x
- **构建工具**: Vite 5.x
- **状态管理**: Pinia 2.x
- **HTTP 客户端**: Axios 1.6+
- **样式方案**: Tailwind CSS 3.4+

## 📝 API 说明

### Ollama API

本项目直接调用本地 Ollama API：

- **获取模型列表**: `GET http://localhost:11434/api/tags`
- **生成回复**: `POST http://localhost:11434/api/generate`

### 流式输出

使用流式输出实现打字机效果，让 AI 回复逐字显示，提升用户体验。

## 🎯 使用说明

### 发送消息

1. 在输入框中输入消息
2. 点击"发送"按钮或按 `Enter` 键发送
3. 使用 `Shift + Enter` 可以换行

### 切换模型

1. 点击头部的模型下拉框
2. 选择想要使用的模型
3. 后续对话将使用选中的模型

### 刷新模型列表

点击模型选择器旁边的 🔄 按钮可以刷新可用模型列表。

## 🔧 开发命令

```bash
# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## ⚠️ 常见问题

### 无法连接到 Ollama 服务

确保 Ollama 正在运行：

```bash
# 检查 Ollama 服务状态
curl http://localhost:11434/api/tags
```

如果没有响应，请启动 Ollama 应用。

### 没有可用模型

使用以下命令下载模型：

```bash
ollama pull llama2
```

### 跨域问题

如果遇到 CORS 错误，可能需要在 Ollama 启动时添加跨域配置：

```bash
OLLAMA_ORIGINS="*" ollama serve
```

## 📄 License

MIT

---

🎉 享受与 AI 聊天的乐趣！
