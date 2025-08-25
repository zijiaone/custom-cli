/**
 * @file i18n.js
 * @description 处理国际化相关的工具函数
 */

const fs = require('fs-extra');
const path = require('path');

/**
 * 根据用户选择处理国际化配置
 * 如果用户选择不需要国际化，则删除相关文件和配置
 * @param {string} projectDir - 项目目录路径
 * @param {string} framework - 项目框架（Vue/React）
 * @param {boolean} needI18n - 是否需要国际化
 * @returns {Promise<void>}
 */
const setupI18n = async (projectDir, framework, needI18n) => {
  // 如果用户选择需要国际化，则不需要做任何处理
  if (needI18n) return;

  // 删除国际化相关文件和配置
  const localesDir = path.join(projectDir, 'src/locales');
  await fs.remove(localesDir);

  // 根据框架类型修改入口文件
  if (framework.toLowerCase() === 'vue') {
    await removeVueI18n(projectDir);
  } else if (framework.toLowerCase() === 'react') {
    await removeReactI18n(projectDir);
  }

  // 从package.json中移除国际化相关依赖
  await removeI18nDependencies(projectDir, framework);
};

/**
 * 从Vue项目中移除国际化配置
 * @param {string} projectDir - 项目目录路径
 * @returns {Promise<void>}
 */
const removeVueI18n = async (projectDir) => {
  const mainFilePath = path.join(projectDir, 'src/main.ts');
  let mainContent = await fs.readFile(mainFilePath, 'utf8');

  // 移除i18n导入
  mainContent = mainContent.replace("import i18n from '@/locales';\n", '');
  // 移除app.use(i18n);
  mainContent = mainContent.replace('app.use(i18n);\n', '');

  await fs.writeFile(mainFilePath, mainContent, 'utf8');
};

/**
 * 从React项目中移除国际化配置
 * @param {string} projectDir - 项目目录路径
 * @returns {Promise<void>}
 */
const removeReactI18n = async (projectDir) => {
  const mainFilePath = path.join(projectDir, 'src/main.tsx');
  let mainContent = await fs.readFile(mainFilePath, 'utf8');

  // 移除i18n导入
  mainContent = mainContent.replace("import './locales';\n", '');

  await fs.writeFile(mainFilePath, mainContent, 'utf8');
};

/**
 * 从package.json中移除国际化相关依赖
 * @param {string} projectDir - 项目目录路径
 * @param {string} framework - 项目框架（Vue/React）
 * @returns {Promise<void>}
 */
const removeI18nDependencies = async (projectDir, framework) => {
  const packageJsonPath = path.join(projectDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  // 根据框架类型确定需要删除的依赖
  const i18nDeps =
    framework.toLowerCase() === 'vue' ? ['vue-i18n'] : ['i18next', 'i18next-browser-languagedetector', 'react-i18next'];

  // 删除相关依赖
  if (packageJson.dependencies) {
    i18nDeps.forEach((dep) => {
      if (packageJson.dependencies[dep]) {
        delete packageJson.dependencies[dep];
      }
    });
  }

  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
};

module.exports = {
  setupI18n,
};
