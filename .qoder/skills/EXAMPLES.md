# Skill 使用示例

## 场景 1: 代码解释与优化

### 用户输入
```
请帮我解释并优化这段代码：

function getUserData(users) {
  let result = [];
  for(let i = 0; i < users.length; i++) {
    if(users[i].age > 18) {
      result.push({
        name: users[i].name,
        email: users[i].email
      });
    }
  }
  return result;
}
```

### AI 回复示例
**代码解释：**
这是一个过滤成年人用户并提取姓名字段的函数。

**存在的问题：**
1. 使用了传统的 for 循环，不够简洁
2. 手动创建数组并 push，可以用更现代的方法
3. 重复访问 `users[i]`，效率较低

**优化后的代码：**
```javascript
function getUserData(users) {
  return users
    .filter(user => user.age > 18)
    .map(user => ({
      name: user.name,
      email: user.email
    }));
}
```

**优化点：**
- ✅ 使用 `filter` + `map` 链式调用
- ✅ 代码更简洁易读
- ✅ 函数式编程风格
- ✅ 避免重复访问数组元素

---

## 场景 2: 文档内容分析

### 用户输入
```
请分析以下 package.json 的依赖关系：

{
  "dependencies": {
    "vue": "^3.4.0",
    "pinia": "^2.1.7",
    "axios": "^1.6.0"
  },
  "devDependencies": {
    "vite": "^5.0.0",
    "typescript": "^5.3.0",
    "tailwindcss": "^3.4.0"
  }
}
```

### AI 回复示例
**文档分析：**

📦 **运行时依赖 (dependencies)**
- `vue@3.4.x`: 前端框架，用于构建用户界面
- `pinia@2.1.x`: Vue3 官方推荐的状态管理库
- `axios@1.6.x`: HTTP 客户端，用于 API 请求

🛠️ **开发依赖 (devDependencies)**
- `vite@5.x`: 现代化的前端构建工具
- `typescript@5.3.x`: JavaScript 的超集，提供类型检查
- `tailwindcss@3.4.x`: 原子化 CSS 框架

🔍 **技术栈判断**
这是一个 **Vue3 + TypeScript + Vite** 的现代前端项目，使用：
- Pinia 做状态管理
- Axios 处理网络请求
- TailwindCSS 处理样式

💡 **建议**
1. 可以添加 `vue-router` 如果需要路由功能
2. 考虑添加 `eslint` 和 `prettier` 统一代码规范
3. 生产环境建议锁定依赖版本

---

## 场景 3: 错误调试

### 用户输入
```
我的 Vue 组件报错：
TypeError: Cannot read properties of undefined (reading 'name')

代码：
<script setup>
const user = ref(null)
console.log(user.name)
</script>
```

### AI 回复示例
**错误分析：**

❌ **问题原因**
`user` 是一个 ref 对象，不能直接访问 `.name` 属性。

**解决方案：**

```vue
<script setup>
import { ref } from 'vue'

const user = ref(null)

// ✅ 正确方式 1：通过 .value 访问
console.log(user.value?.name)

// ✅ 正确方式 2：在模板中自动解包
// <template>
//   <p>{{ user?.name }}</p>
// </template>
</script>
```

**关键点：**
- 🔑 ref 包装的值需要通过 `.value` 访问
- 🔑 使用可选链 `?.` 防止 undefined 错误
- 🔑 在 `<template>` 中会自动解包，不需要 `.value`

---

## 场景 4: 技术方案对比

### 用户输入
```
Vue3 中 ref 和 reactive 有什么区别？什么时候用哪个？
```

### AI 回复示例
**对比分析：**

| 特性 | ref | reactive |
|------|-----|----------|
| **包装类型** | 任意类型 | 仅对象/数组 |
| **访问方式** | 需要 `.value` | 直接访问 |
| **替换整个对象** | ✅ 支持 | ❌ 会丢失响应性 |
| **适用场景** | 基本类型、单值 | 复杂对象、多属性 |

**使用建议：**

```typescript
// ✅ 使用 ref 的场景
const count = ref(0)          // 基本类型
const name = ref('Alice')     // 字符串
const user = ref(null)        // 可能为 null 的对象

// ✅ 使用 reactive 的场景
const form = reactive({       // 表单数据
  name: '',
  email: '',
  age: 0
})

const state = reactive({      // 复杂状态对象
  users: [],
  loading: false,
  error: null
})
```

**最佳实践：**
1. 🎯 **优先使用 ref**：更灵活，不容易出错
2. 🎯 **对象属性多用 reactive**：访问更简洁
3. 🎯 **混合使用**：根据实际情况选择

---

## 场景 5: 配置文件解释

### 用户输入
```
解释一下这个 vite.config.ts：

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
  },
})
```

### AI 回复示例
**配置详解：**

🔧 **plugins: [vue()]**
- 启用 Vue 插件，支持 `.vue` 文件编译
- 提供 Vue SFC（单文件组件）支持

📂 **resolve.alias**
```typescript
'@': resolve(__dirname, 'src')
```
- 创建路径别名 `@` 指向 `src` 目录
- 导入时可以这样写：
  ```typescript
  // ❌ 繁琐的相对路径
  import Button from '../../../components/Button.vue'
  
  // ✅ 使用别名
  import Button from '@/components/Button.vue'
  ```

🌐 **server.port: 3000**
- 开发服务器运行在 3000 端口
- 访问地址：http://localhost:3000

**可以添加的配置：**
```typescript
// 代理配置（解决跨域）
server: {
  port: 3000,
  proxy: {
    '/api': 'http://localhost:8080'
  }
}

// 构建优化
build: {
  minify: 'terser',
  sourcemap: true
}
```

---

## 💡 使用技巧

### 1. 提供完整上下文
```
✅ 好：我在用 Vue3 + TypeScript，这个组件报错...
❌ 差：报错了，怎么办？
```

### 2. 明确需求
```
✅ 好：请优化这段代码的性能，现在太慢了
❌ 差：这个代码不好
```

### 3. 分步骤提问
```
第1步：这段代码的逻辑是什么？
第2步：有什么潜在问题？
第3步：如何改进？
```

### 4. 指定输出格式
```
请用表格对比
请用代码示例说明
请分点列出
```
