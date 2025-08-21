export default {
  // 忽略某些提交信息不进行校验
  // 这里配置了一个函数：如果提交信息（commit message）中包含 'init'，则跳过校验
  // 比如 "Initial commit" 或 "init: project setup" 将不会被校验
  ignores: [(commit) => commit.includes('init')],

  // 继承的规则配置
  // 使用了 @commitlint/config-conventional 插件，这是一个常见的符合 Angular 提交规范的配置
  // 它默认规定了提交类型（type）、范围（scope）、主题（subject）、正文（body）和页脚（footer）等格式
  extends: ['@commitlint/config-conventional'],

  // 自定义规则
  rules: {
    // 对提交类型（type）的枚举限制
    // 格式说明：[level, when, value]
    // - level: 2 表示错误级别（error），会被视为校验失败并阻止提交
    // - when: 'always' 表示始终应用该规则
    // - value: 允许的提交类型列表
    'type-enum': [
      2, // 错误等级：error
      'always', // 规则始终生效
      [
        'feat', // 新功能（feature）
        'fix', // 修复 bug
        'perf', // 性能优化
        'style', // 样式修改（不影响代码运行）
        'docs', // 文档更新
        'test', // 测试相关改动
        'refactor', // 重构代码（不新增功能也不修复 bug）
        'build', // 构建流程、依赖更改
        'ci', // CI/CD 配置修改
        'chore', // 杂项（其他不重要的修改）
        'revert', // 回滚提交
        'wip', // 正在开发中（Work In Progress）
        'workflow', // 工作流相关
        'types', // 类型定义相关（如 TypeScript 类型）
      ],
    ],
  },
};
