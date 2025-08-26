const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const ora = require('ora');

const { projectConfigPrompts } = require('../prompts/initPrompts');
const { checkDirectoryExists, updatePackageJson } = require('../utils/file');
const { setupI18n } = require('../utils/i18n');

/**
 * 初始化项目函数
 *
 * @description 执行完整的项目创建流程，包括：
 * 1. 收集用户配置 - 项目名称、框架选择(Vue/React)、是否需要国际化
 * 2. 准备项目目录 - 创建或清空目标文件夹
 * 3. 复制模板文件 - 基于用户选择的框架复制对应模板
 * 4. 自定义项目配置 - 更新package.json和添加国际化支持
 *
 * @param {boolean} force - 如果目标目录不为空，是否强制删除内容
 * @returns {Promise<void>} - 无返回值的Promise
 */
const init = async (force = false) => {
  // 步骤1: 收集用户项目配置
  const answers = await inquirer.default.prompt(projectConfigPrompts);
  const { projectName, framework, needI18n } = answers;

  // 步骤2: 准备项目路径
  const projectDir = path.resolve(process.cwd(), projectName);
  const templateDir = path.resolve(__dirname, '../templates', framework.toLowerCase());

  // 步骤3: 检查并处理目录冲突
  await checkDirectoryExists(projectDir, force);

  // 步骤4: 开始项目脚手架搭建
  const spinner = ora.default(`Scaffolding project in ${projectDir}...`).start();
  try {
    // 步骤4.1: 复制模板文件到项目目录
    await fs.copy(templateDir, projectDir);

    // 步骤4.2: 更新package.json中的项目名称
    await updatePackageJson(projectDir, projectName);

    // 步骤4.3: 根据用户选择处理国际化配置
    await setupI18n(projectDir, framework, needI18n);

    spinner.stop();

    // 步骤5: 显示成功信息和后续步骤
    console.log(`

      ✅ Successfully initialized the project!
      👉 Please execute the following command:

        ${chalk.cyan(`cd ${projectName}`)}
        ${chalk.cyan('npm install')}
        ${chalk.cyan('npm run dev')}
    `);
  } catch (error) {
    spinner.stop();
    console.error(chalk.red(`❌ Error creating project: ${error.message}`));
    process.exit(1); // 发生错误时以非零状态码退出进程
  }
};

module.exports = {
  init,
};
