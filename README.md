# @zj/cli

🚀 A modern CLI tool for initializing Vue or React projects with ease.

## 安装

```bash
npm install -g @zj/cli
```

## 使用方法

### 创建新项目

```bash
zj-cli init [project-name]
```

### 关于 `project-name` 参数

`project-name` 是**可选参数**，使用方式如下：

- **不提供参数**：通过交互式提示输入项目名称
  ```bash
  zj-cli init
  ```

- **提供参数**：直接使用指定的名称，跳过项目名称的输入步骤
  ```bash
  zj-cli init my-project
  ```

- **提供带路径的参数**：在指定路径创建项目
  ```bash
  zj-cli init ./folderPath/my-project
  ```

无论是否提供 `project-name` 参数，您都需要完成其他配置项（如选择框架、是否需要国际化支持等）。

### 强制创建项目

如果目标目录已存在，可以使用 `-f` 或 `--force` 选项强制创建：

```bash
zj-cli init -f
zj-cli init my-project -f
zj-cli init ./folderPath/my-project -f
```

### 查看帮助信息

```bash
zj-cli --help
zj-cli init --help
```
