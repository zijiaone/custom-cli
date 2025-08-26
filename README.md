# @zj/cli

🚀 A modern CLI tool for initializing Vue or React projects with ease.

## 安装

```bash
npm install -g @zj/cli
```

## 使用方法

### 创建新项目

```bash
zj-cli init
```

按照提示输入项目信息：

- 项目名称（仅支持字母、数字、连字符和下划线）
- 选择框架（Vue 或 React）
- 是否需要国际化支持

### 强制创建项目

如果目标目录已存在，可以使用 `-f` 或 `--force` 选项强制创建：

```bash
zj-cli init -f
```

### 查看帮助信息

```bash
zj-cli --help
zj-cli init --help
```
