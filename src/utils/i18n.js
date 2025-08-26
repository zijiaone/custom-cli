const fs = require('fs-extra');
const path = require('path');

/**
 * 根据用户选择处理国际化配置
 *
 * @description 该函数根据用户选择决定是否保留国际化功能：
 * 1. 如果用户选择需要国际化(needI18n=true)，保留所有国际化配置
 * 2. 如果用户选择不需要国际化(needI18n=false)，则：
 *    - 删除国际化相关文件夹(locales)
 *    - 修改入口文件移除国际化引用
 *    - 从package.json中移除国际化相关依赖
 *
 * @param {string} projectDir - 项目目录路径
 * @param {string} framework - 项目框架（Vue/React）
 * @param {boolean} needI18n - 是否需要国际化
 * @returns {Promise<void>} - 无返回值的Promise
 */
const setupI18n = async (projectDir, framework, needI18n) => {
  // 场景1: 用户选择需要国际化 - 无需任何处理
  if (needI18n) return;

  // 场景2: 用户选择不需要国际化 - 执行清理操作

  // 步骤1: 删除国际化相关文件夹
  const localesDir = path.join(projectDir, 'src/locales');
  await fs.remove(localesDir); // 递归删除整个目录

  // 步骤2: 根据框架类型修改入口文件
  const frameworkHandlers = {
    vue: removeVueI18n,
    react: removeReactI18n,
  };

  const handler = frameworkHandlers[framework.toLowerCase()];
  if (handler) {
    await handler(projectDir);
  }

  // 步骤3: 从package.json中移除国际化相关依赖
  await removeI18nDependencies(projectDir, framework);
};

/**
 * 从Vue项目中移除国际化配置
 *
 * @description 修改Vue项目的main.ts文件，移除：
 * - i18n的导入语句
 * - app.use(i18n)的注册语句
 *
 * @param {string} projectDir - 项目目录路径
 * @returns {Promise<void>} - 无返回值的Promise
 */
const removeVueI18n = async (projectDir) => {
  // 获取Vue项目的入口文件路径
  const mainFilePath = path.join(projectDir, 'src/main.ts');

  // 读取入口文件内容
  let mainContent = await fs.readFile(mainFilePath, 'utf8');

  // 移除i18n相关代码
  // 1. 移除导入语句
  mainContent = mainContent.replace("import i18n from '@/locales';\n", '');
  // 2. 移除插件注册语句
  mainContent = mainContent.replace('app.use(i18n);\n', '');

  // 写入更新后的内容
  await fs.writeFile(mainFilePath, mainContent, 'utf8');
};

/**
 * 从React项目中移除国际化配置
 *
 * @description 修改React项目的main.tsx文件，移除：
 * - 国际化配置文件的导入语句
 *
 * @param {string} projectDir - 项目目录路径
 * @returns {Promise<void>} - 无返回值的Promise
 */
const removeReactI18n = async (projectDir) => {
  // 获取React项目的入口文件路径
  const mainFilePath = path.join(projectDir, 'src/main.tsx');

  // 读取入口文件内容
  let mainContent = await fs.readFile(mainFilePath, 'utf8');

  // 移除i18n相关代码
  // 移除导入语句
  mainContent = mainContent.replace("import './locales';\n", '');

  // 写入更新后的内容
  await fs.writeFile(mainFilePath, mainContent, 'utf8');
};

/**
 * 从package.json中移除国际化相关依赖
 *
 * @description 根据框架类型，从package.json中移除不同的国际化依赖：
 * - Vue项目: vue-i18n
 * - React项目: i18next, i18next-browser-languagedetector, react-i18next
 *
 * @param {string} projectDir - 项目目录路径
 * @param {string} framework - 项目框架（Vue/React）
 * @returns {Promise<void>} - 无返回值的Promise
 */
const removeI18nDependencies = async (projectDir, framework) => {
  // 获取package.json文件路径
  const packageJsonPath = path.join(projectDir, 'package.json');

  // 读取package.json内容
  const packageJson = await fs.readJson(packageJsonPath);

  // 根据框架类型确定需要删除的依赖
  const i18nDeps =
    framework.toLowerCase() === 'vue'
      ? ['vue-i18n'] // Vue项目的国际化依赖
      : ['i18next', 'i18next-browser-languagedetector', 'react-i18next']; // React项目的国际化依赖

  // 从dependencies中删除相关依赖
  if (packageJson.dependencies) {
    i18nDeps.forEach((dep) => {
      if (packageJson.dependencies[dep]) {
        delete packageJson.dependencies[dep];
      }
    });
  }

  // 写入更新后的package.json，保持2空格缩进格式
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
};

module.exports = {
  setupI18n,
};
