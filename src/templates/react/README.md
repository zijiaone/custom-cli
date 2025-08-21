# React Vite Template

基于 React 19 + Vite 的前端标准化工程模板，集成当前主流的开发工具链和最佳实践。

## ✨ 特性

- 🚀 React 19 + Vite 7 + TypeScript
- 📦 Redux Toolkit - 状态管理
- 🌍 React i18next - 国际化
- 🔌 Axios - 网络请求
- 🎨 Less - CSS 预处理器
- 📝 ESLint + Prettier + Stylelint - 代码规范与格式化
- 🎯 Simple Git Hooks + Commitlint - Git 提交规范

## 🚀 快速开始

### 环境要求

- Node.js >= 20.0.0

### 开发流程

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

> **注意**：如果在非Git仓库环境中安装了依赖，后续初始化Git仓库后，需要手动执行 `npm run prepare` 命令来设置Git钩子，以启用代码质量检查功能。

## 📖 开发指南

### 状态管理

项目采用 Redux Toolkit 作为状态管理方案，通过创建 slice 定义状态和 reducer，使用 configureStore 配置全局 store，并提供了类型安全的状态访问和操作方式。

```typescript
import { useSelector, useDispatch } from 'react-redux';
import { increment } from '@/stores/counterSlice';

// 在组件中使用 Redux store
const count = useSelector((state) => state.counter.value);
const dispatch = useDispatch();

// 更新状态
dispatch(increment());
```

### 国际化

```typescript
import { useTranslation } from 'react-i18next';

// 使用翻译
const { t, i18n } = useTranslation();
console.log(t('hello'));

// 切换语言
i18n.changeLanguage('en-US');
```

### 网络请求

开发环境配置（`.env.development`）：

```
VITE_API_BASE_URL = 'http://api.example.com'
```

## 📝 Git 提交规范

```bash
# 提交格式
type(scope?): subject

# 示例
feat(user): add user login
fix(auth): fix token expired
```

常用类型：

- feat: 新功能
- fix: Bug 修复
- docs: 文档更新
- style: 代码格式调整
- refactor: 代码重构
- perf: 性能优化

## 🔧 代码质量

```bash
# 代码检查
npm run lint

# 代码格式化
npm run format
```
