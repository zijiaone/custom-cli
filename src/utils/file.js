/**
 * @file file.js
 * @description 文件操作相关的工具函数
 */

const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const { overwritePrompts } = require('../prompts/initPrompts');

/**
 * 检查目录是否存在，如果存在则询问用户是否覆盖，并创建目录
 * @async
 * @param {string} dirPath - 要检查的目录路径
 * @returns {Promise<boolean>} - 如果目录不存在或用户选择覆盖，返回true；如果用户取消操作，返回false
 */
async function checkDirectoryExists(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(chalk.yellow(`⚠️ Project directory already exists!`));

    // 询问用户是否覆盖已存在的目录
    const { overwrite } = await inquirer.default.prompt(overwritePrompts);

    if (overwrite) {
      const spinner = ora.default(`Removing target directory (${dirPath})`).start();
      await fs.rmSync(dirPath, { recursive: true, force: true });
      setTimeout(() => {
        spinner.stop();
      }, 1000);
    } else {
      // 用户选择不覆盖，取消操作并退出程序
      console.log(chalk.red('❌ Operation cancelled'));
      process.exit(1);
    }
  }

  // 创建目录
  fs.mkdirSync(dirPath);
  return true;
}

module.exports = {
  checkDirectoryExists,
};
