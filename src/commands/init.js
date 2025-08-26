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
 * @param {boolean} force - 是否强制删除目标目录内容
 * @returns {Promise<void>}
 */
const init = async (force = false) => {
  // 声明spinner变量在函数作用域内
  let spinner;

  try {
    // 收集用户项目配置
    const answers = await inquirer.default.prompt(projectConfigPrompts);
    const { projectName, framework, needI18n } = answers;

    // 准备项目路径
    const projectDir = path.resolve(process.cwd(), projectName);
    const templateDir = path.resolve(__dirname, '../templates', framework.toLowerCase());

    // 检查并处理目录冲突
    await checkDirectoryExists(projectDir, force);

    // 开始项目脚手架搭建
    spinner = ora.default(`Scaffolding project in ${projectDir}...`).start();

    // 复制模板文件
    await fs.copy(templateDir, projectDir);

    // 更新package.json
    await updatePackageJson(projectDir, projectName);

    // 处理国际化配置
    await setupI18n(projectDir, framework, needI18n);

    spinner.stop();

    // 显示成功信息和后续步骤
    console.log(`

      ✅ Successfully initialized the project!
      👉 Please execute the following command:

        ${chalk.cyan(`cd ${projectName}`)}
        ${chalk.cyan('npm install')}
        ${chalk.cyan('npm run dev')}
    `);
  } catch (error) {
    // 停止加载动画（如果已启动）
    if (spinner) {
      spinner.stop();
    }

    // 处理用户中断（SIGINT）错误
    if (error.name === 'ExitPromptError' || error.message.includes('SIGINT')) {
      console.log(chalk.yellow('\n⚠️ Operation cancelled: Command execution interrupted by user'));
      process.exit(0); // 正常退出，不显示错误堆栈
    } else {
      // 处理其他错误
      console.error(chalk.red(`\n❌ Project creation failed: ${error.message}`));
      process.exit(1); // 以非零状态码退出进程
    }
  }
};

module.exports = {
  init,
};
