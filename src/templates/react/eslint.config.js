import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from 'typescript-eslint';

import js from '@eslint/js';

export default tseslint.config([
  // TypeScript和React基础配置：设置语言特性和扩展推荐规则
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  // 导入规则配置：规范化模块导入的格式和顺序
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
    },
    rules: {
      'import/first': 'off',
      'import/newline-after-import': 'error',
      'import/no-duplicates': 'error',
    },
  },
  // 导入排序插件配置：规范化导入语句的顺序
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
    },
    rules: {
      'simple-import-sort/exports': 'error', // 规范化导出语句的顺序
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^[a-zA-Z]'], // 第三方 npm 包导入
            ['^@services'], // 服务层导入
            ['^@hooks'], // 自定义 Hook 导入
            ['^@router'], // 路由相关导入
            ['^@stores'], // 状态管理相关导入
            ['^@common'], // 公共模块导入
            ['^@components'], // 组件导入
            ['^@pages'], // 页面视图导入
            ['^@utils'], // 工具函数导入
            ['^@helper'], // 辅助函数导入
            ['^@types'], // 类型定义导入
            ['^@locales'], // 国际化资源导入
            ['^@styles'], // 样式文件导入
            ['^@assets'], // 图片资源导入
            ['^[^.]'], // 其他绝对路径导入
            ['^\\.\\.'], // 父目录相对路径导入
            ['^\\.'], // 当前目录相对路径导入
          ],
        },
      ],
    },
  },
  // React代码格式化规则：确保代码风格一致性和可读性
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      react: reactPlugin,
      perfectionist: perfectionist,
    },
    rules: {
      'perfectionist/sort-jsx-props': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          specialCharacters: 'keep',
          ignorePattern: [],
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          groups: ['multiline', 'unknown', 'shorthand', 'callback'],
          customGroups: {
            GLOBAL: '^id',
            UNIQUE: '^(ref|key)',
            callback: '^on.+',
          },
        },
      ],
      'perfectionist/sort-array-includes': 'error',
      'perfectionist/sort-classes': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          ignoreCase: true,
          specialCharacters: 'keep',
          partitionByComment: false,
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          ignoreCallbackDependenciesPatterns: [],
          groups: [
            'index-signature',
            ['static-property', 'static-accessor-property'],
            ['static-get-method', 'static-set-method'],
            ['protected-static-property', 'protected-static-accessor-property'],
            ['protected-static-get-method', 'protected-static-set-method'],
            ['private-static-property', 'private-static-accessor-property'],
            ['private-static-get-method', 'private-static-set-method'],
            'static-block',
            ['static-method', 'static-function-property'],
            ['protected-static-method', 'protected-static-function-property'],
            ['private-static-method', 'private-static-function-property'],
            ['property', 'accessor-property'],
            ['protected-property', 'protected-accessor-property'],
            ['protected-get-method', 'protected-set-method'],
            ['private-property', 'private-accessor-property'],
            ['private-get-method', 'private-set-method'],
            'constructor',
            ['get-method', 'set-method'],
            ['method', 'function-property'],
            ['protected-method', 'protected-function-property'],
            ['private-method', 'private-function-property'],
            'unknown',
          ],
          customGroups: [],
        },
      ],
      'perfectionist/sort-enums': 'error',
      'perfectionist/sort-intersection-types': 'error',
      'perfectionist/sort-interfaces': 'error',
      'perfectionist/sort-named-imports': [
        'error',
        {
          ignoreAlias: true,
        },
      ],
      'perfectionist/sort-object-types': ['error'],
    },
  },
  // 忽略配置：指定不需要进行 ESLint 检查的文件
  {
    ignores: ['node_modules/*', 'dist/*', 'public/*', '*.d.ts'],
  },
]);
