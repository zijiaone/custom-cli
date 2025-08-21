import importPlugin from 'eslint-plugin-import';
import perfectionist from 'eslint-plugin-perfectionist';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import pluginVue from 'eslint-plugin-vue';

import skipFormatting from '@vue/eslint-config-prettier/skip-formatting';
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript';

export default defineConfigWithVueTs(
  // 基础配置：定义需要进行 ESLint 检查的文件范围
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'], // 匹配所有 TypeScript 和 Vue 文件
  },
  // Vue 插件推荐配置：使用 Vue3 扁平化配置
  pluginVue.configs['flat/recommended'],
  // TypeScript 推荐配置：启用 TypeScript 相关的规则
  vueTsConfigs.recommended,
  // 跳过 Prettier 格式化：避免与 ESLint 的格式化规则冲突
  skipFormatting,
  // Prettier 插件配置：集成 Prettier 的代码格式化能力
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier': 'error', // 违反 Prettier 规则时报错
    },
  },
  // 代码格式化插件配置：自动排序和组织代码元素，提高可读性和一致性
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    plugins: {
      perfectionist,
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
          groups: [
            'DEFINITION',
            'LIST_RENDERING',
            'CONDITIONALS',
            'RENDER_MODIFIERS',
            'GLOBAL',
            'UNIQUE',
            'SLOT',
            'TWO_WAY_BINDING',
            'OTHER_DIRECTIVES',
            'multiline',
            'unknown',
            'shorthand',
            'callback',
          ],
          customGroups: {
            DEFINITION: '^v-is',
            LIST_RENDERING: '^v-for',
            CONDITIONALS: '^(v-if|v-else-if|v-else|v-show|v-cloak)',
            RENDER_MODIFIERS: '^(v-once|v-pre)',
            GLOBAL: '^id',
            UNIQUE: '^(ref|key)',
            SLOT: '^v-slot',
            TWO_WAY_BINDING: '^v-model',
            OTHER_DIRECTIVES: '^v-.+',
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
    ignores: ['**/**/routes.ts', 'src/stores/*'],
  },
  // 格式化 vue router 的配置顺序
  {
    plugins: {
      perfectionist,
    },
    files: ['**/**/routes.ts'],
    rules: {
      'perfectionist/sort-objects': [
        'error',
        {
          groups: ['path', 'name', 'meta', 'unknown', 'component', 'children'],
          customGroups: [
            {
              groupName: 'path',
              elementNamePattern: 'path',
            },
            {
              groupName: 'name',
              elementNamePattern: 'name',
            },
            {
              groupName: 'meta',
              elementNamePattern: 'meta',
            },
            {
              groupName: 'component',
              elementNamePattern: 'component',
            },
            {
              groupName: 'children',
              elementNamePattern: 'children',
            },
          ],
        },
      ],
    },
  },
  // 格式化 vue store 的配置顺序
  {
    plugins: {
      perfectionist,
    },
    files: ['src/stores/*'],
    rules: {
      'perfectionist/sort-objects': [
        'error',
        {
          groups: ['state', 'getters', 'actions', 'unknown'],
          customGroups: [
            {
              groupName: 'state',
              elementNamePattern: 'state',
            },
            {
              groupName: 'getters',
              elementNamePattern: 'getters',
            },
            {
              groupName: 'actions',
              elementNamePattern: 'actions',
            },
          ],
        },
      ],
    },
  },
  // 导入规则配置：规范化模块导入的格式和顺序
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.vue'],
    plugins: {
      import: importPlugin,
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
            ['^@views'], // 页面视图导入
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
  // Vue 文件特定规则配置：针对 .vue 文件的专门规则
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off', // 关闭组件名必须多单词的限制
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never', // 单行元素的闭合标签不换行
          multiline: 'never', // 多行元素的闭合标签不换行
        },
      ],
      'vue/block-order': ['warn', { order: ['template', 'script', 'style'] }], // 强制 template/script/style 标签顺序
      'vue/attributes-order': [
        'error',
        {
          order: [
            // 强制模板中属性的顺序
            'DEFINITION', // v-model, v-for 等定义性指令
            'LIST_RENDERING', // v-for 等列表渲染指令
            'CONDITIONALS', // v-if, v-else-if, v-else, v-show 等条件渲染指令
            'RENDER_MODIFIERS', // v-once, v-pre 等渲染修饰符
            'GLOBAL', // id, ref 等全局属性
            ['UNIQUE', 'SLOT'], // key, slot, slot-scope 等唯一性属性
            'TWO_WAY_BINDING', // v-model 等双向绑定
            'OTHER_DIRECTIVES', // 其他指令
            'OTHER_ATTR', // class, style 等其他属性
            'EVENTS', // @click 等事件绑定
            'CONTENT', // v-text, v-html 等内容绑定
          ],
          alphabetical: true, // 同组属性按字母顺序排序
        },
      ],
      'vue/define-macros-order': [
        'error',
        {
          order: ['defineOptions', 'defineProps', 'defineEmits', 'defineSlots', 'defineModel'], // script setup 宏的顺序
          defineExposeLast: false, // defineExpose 不必放在最后
        },
      ],
      'vue/no-undef-properties': ['error', { ignores: ['/^\\$/'] }], // 禁止使用未定义的属性，忽略 $ 开头的内置属性
      'vue/no-unused-properties': [
        'error',
        {
          groups: ['props'], // 检查未使用的 props
          deepData: false, // 不深入检查数据属性
          ignorePublicMembers: false, // 不忽略公共成员
        },
      ],
      'vue/no-useless-mustaches': [
        'error',
        {
          ignoreIncludesComment: false, // 不忽略包含注释的情况
          ignoreStringEscape: false, // 不忽略字符串转义
        },
      ],
      'vue/no-useless-v-bind': [
        'error',
        {
          ignoreIncludesComment: false, // 不忽略包含注释的情况
          ignoreStringEscape: false, // 不忽略字符串转义
        },
      ],
      'vue/prefer-separate-static-class': 'error', // 推荐使用独立的静态 class 属性
      'vue/prefer-true-attribute-shorthand': 'error', // 推荐使用 :prop 而不是 :prop="true"
      'vue/component-name-in-template-casing': [
        'error',
        'PascalCase', // 模板中组件名使用 PascalCase
        {
          registeredComponentsOnly: false, // 检查所有组件名，不仅限于已注册的
          ignores: [], // 不忽略任何组件名
        },
      ],
      'vue/no-setup-props-reactivity-loss': 'off', // 关闭 setup 中 props 响应性丢失的检查
      'vue/no-setup-props-destructure': 'off', // 关闭 setup 中解构 props 的检查
      'vue/no-unused-vars': ['error'], // 禁止模板中出现未使用的变量
    },
  },
  // 忽略配置：指定不需要进行 ESLint 检查的文件
  {
    ignores: ['node_modules/*', 'dist/*', 'public/*', '*.d.ts'], // 忽略第三方包、构建产物、公共资源和类型声明文件
  },
);
