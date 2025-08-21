#!/usr/bin/env node

/**
 * Git Hooks 初始化脚本
 *
 * 该脚本用于在项目安装依赖后自动设置 Git Hooks，以确保代码质量检查工具能够在提交代码前运行。
 * 脚本会检测当前环境是否为 Git 仓库：
 * - 如果是 Git 仓库，则自动设置 Git Hooks
 * - 如果不是 Git 仓库，则跳过设置并提示用户后续需要手动执行
 *
 * 由 package.json 中的 prepare 钩子调用
 */

import { execSync } from 'child_process';

try {
  // 检查当前目录是否在 Git 仓库中
  // 如果不是 Git 仓库，该命令会抛出异常并进入 catch 块
  execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });

  // 检测到 Git 仓库，执行 simple-git-hooks 设置 Git 钩子
  // 根据 package.json 中的配置自动设置 pre-commit、commit-msg 等钩子
  console.log('Git repository detected, setting up git hooks...');
  execSync('npx simple-git-hooks', { stdio: 'inherit' });
} catch {
  // 捕获异常，表示当前不是 Git 仓库
  // 当前不是 Git 仓库环境，跳过 Git 钩子设置
  // 输出提示信息，包括跳过原因和后续操作指导
  console.log('Skipping git hooks setup: not a git repository');
  console.log(
    '\x1b[33mNOTE: If you initialize a git repository later, please run "npm run prepare" manually to set up git hooks.\x1b[0m',
  );
  console.log('\x1b[33m      This is required to enable code quality checks before commits.\x1b[0m');
}
