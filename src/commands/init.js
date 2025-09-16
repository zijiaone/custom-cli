const chalk = require('chalk');
const path = require('path');
const fs = require('fs-extra');
const { intro, outro, cancel, isCancel, log } = require('@clack/prompts');

const { collectUserInput } = require('../prompts/initPrompts');
const { checkDirectoryExists, updatePackageJson, resolveProjectPath } = require('../utils/file');
const { setupI18n } = require('../utils/i18n');

/**
 * 初始化项目函数
 *
 * @param {string} projectNameArg - 命令行传入的项目名称或路径
 * @param {boolean} force - 是否强制删除目标目录内容
 * @returns {Promise<void>}
 */
const init = async (projectNameArg, force = false) => {
  try {
    // 开始交互式提示
    intro('Create Project');

    // 收集用户项目配置
    const userInput = await collectUserInput(projectNameArg);
    const { projectName, framework, needI18n } = userInput;

    // 准备项目路径
    const projectDir = resolveProjectPath(projectNameArg, projectName);
    const templateDir = path.resolve(__dirname, '../templates', framework.toLowerCase());

    // 检查并处理目录冲突
    await checkDirectoryExists(projectDir, force);

    log.step(`Scaffolding project in ${projectDir}...`);

    // 复制模板文件
    await fs.copy(templateDir, projectDir);

    // 更新package.json
    await updatePackageJson(projectDir, projectName);

    // 处理国际化配置
    await setupI18n(projectDir, framework, needI18n);

    // 显示成功信息和后续步骤
    outro(`✅ Successfully initialized the project!
   👉 Please execute the following command:

      ${chalk.cyan(`cd ${projectName}`)}
      ${chalk.cyan('npm install')}
      ${chalk.cyan('npm run dev')}
    `);
  } catch (error) {
    // 处理用户中断错误
    if (isCancel(error) || error.name === 'ExitPromptError' || error.message.includes('SIGINT')) {
      cancel('Operation cancelled');
      process.exit(0); // 正常退出，不显示错误堆栈
    } else {
      // 处理其他错误
      cancel(`Project creation failed: ${error.message}`);
      process.exit(1); // 以非零状态码退出进程
    }
  }
};

module.exports = {
  init,
};
