const fs = require('fs-extra');
const path = require('path');

/**
 * 处理国际化配置
 *
 * @param {string} projectDir - 项目目录路径
 * @param {string} framework - 项目框架（Vue/React）
 * @param {boolean} needI18n - 是否需要国际化
 * @returns {Promise<void>}
 */
const setupI18n = async (projectDir, framework, needI18n) => {
  // 如果需要国际化，无需处理
  if (needI18n) return;

  // 删除国际化相关文件夹
  const localesDir = path.join(projectDir, 'src/locales');
  await fs.remove(localesDir); // 递归删除整个目录

  // 根据框架类型修改入口文件
  const frameworkHandlers = {
    vue: removeVueI18n,
    react: removeReactI18n,
  };

  const handler = frameworkHandlers[framework.toLowerCase()];
  if (handler) {
    await handler(projectDir);
  }

  // 移除国际化相关依赖
  await removeI18nDependencies(projectDir, framework);
};

/**
 * 从Vue项目中移除国际化配置
 *
 * @param {string} projectDir - 项目目录路径
 * @returns {Promise<void>}
 */
const removeVueI18n = async (projectDir) => {
  const mainFilePath = path.join(projectDir, 'src/main.ts');
  let mainContent = await fs.readFile(mainFilePath, 'utf8');

  // 移除i18n相关代码
  mainContent = mainContent.replace("import i18n from '@/locales';\n", '');
  mainContent = mainContent.replace('app.use(i18n);\n', '');

  // 写入更新后的内容
  await fs.writeFile(mainFilePath, mainContent, 'utf8');
};

/**
 * 从React项目中移除国际化配置
 *
 * @param {string} projectDir - 项目目录路径
 * @returns {Promise<void>}
 */
const removeReactI18n = async (projectDir) => {
  const mainFilePath = path.join(projectDir, 'src/main.tsx');
  let mainContent = await fs.readFile(mainFilePath, 'utf8');

  // 移除i18n相关代码
  mainContent = mainContent.replace("import './locales';\n", '');

  // 写入更新后的内容
  await fs.writeFile(mainFilePath, mainContent, 'utf8');
};

/**
 * 从package.json中移除国际化相关依赖
 *
 * @param {string} projectDir - 项目目录路径
 * @param {string} framework - 项目框架（Vue/React）
 * @returns {Promise<void>}
 */
const removeI18nDependencies = async (projectDir, framework) => {
  const packageJsonPath = path.join(projectDir, 'package.json');
  const packageJson = await fs.readJson(packageJsonPath);

  // 确定需要删除的依赖
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

  // 写入更新后的package.json
  await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
};

module.exports = {
  setupI18n,
};
