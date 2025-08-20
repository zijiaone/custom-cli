const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const inquirer = require('inquirer');
const { projectConfigPrompts, overwritePrompts } = require('../prompts/initPrompts');

/**
 * 初始化项目
 * 执行项目创建流程，包括收集用户配置、创建项目目录和生成项目文件
 * @async
 * @returns {Promise<void>}
 */
const init = async () => {
  // 收集用户项目配置
  // 注意：使用inquirer.default是因为inquirer 12.x版本在CommonJS中需要通过default属性访问
  const answers = await inquirer.default.prompt(projectConfigPrompts);
  const { projectName } = answers;

  // 解析项目完整路径
  const projectDir = path.resolve(process.cwd(), projectName);

  // 检查项目目录是否已存在
  if (fs.existsSync(projectDir)) {
    console.log(chalk.yellow(`⚠️ Project directory already exists!`));

    // 询问用户是否覆盖已存在的目录
    const { overwrite } = await inquirer.default.prompt(overwritePrompts);

    if (overwrite) {
      // 异步删除目录，确保完成后再继续
      await fs.remove(projectDir);
    } else {
      // 用户选择不覆盖，取消操作并退出程序
      console.log(chalk.red('❌ Operation cancelled'));
      process.exit(1);
    }
  }

  // 创建项目目录
  fs.mkdirSync(projectDir);

  // 根据用户选择的框架复制模板文件
  const { framework } = answers;
  const templateDir = path.resolve(__dirname, '../templates', framework.toLowerCase());

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
