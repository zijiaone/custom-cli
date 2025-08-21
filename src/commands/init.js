const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const ora = require('ora');
const { projectConfigPrompts } = require('../prompts/initPrompts');
const { checkDirectoryExists } = require('../utils/file');

/**
 * 初始化项目
 * 执行项目创建流程，包括收集用户配置、创建项目目录和生成项目文件
 * @async
 * @returns {Promise<void>}
 */
const init = async () => {
  // 收集用户项目配置
  const answers = await inquirer.default.prompt(projectConfigPrompts);
  const { projectName, framework } = answers;
  // 解析项目完整路径
  const projectDir = path.resolve(process.cwd(), projectName);
  // 根据用户选择的框架复制模板文件
  const templateDir = path.resolve(__dirname, '../templates', framework.toLowerCase());

  // 检查项目目录是否已存在，如果存在则询问用户是否覆盖，并创建目录
  await checkDirectoryExists(projectDir);

  const spinner = ora.default(`Scaffolding project in ${projectDir}...`).start();
  spinner.stop();

  try {
    // 复制模板文件到项目目录
    await fs.copy(templateDir, projectDir);
  } catch (error) {
    console.error(chalk.red(`❌ Error creating project: ${error.message}`));
    process.exit(1);
  }
};

module.exports = {
  init,
};
