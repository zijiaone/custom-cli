const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');

const { overwritePrompts } = require('../prompts/initPrompts');

/**
 * 检查目录是否存在并处理冲突
 *
 * @param {string} dirPath - 要检查的目录路径
 * @param {boolean} force - 是否直接覆盖目录
 * @returns {Promise<boolean>} - 操作成功返回true
 */
async function checkDirectoryExists(dirPath, force = false) {
  if (fs.existsSync(dirPath)) {
    if (force) {
      // 强制模式 - 直接删除目录
      const spinner = ora.default(`Force removing target directory (${dirPath})`).start();
      await fs.rmSync(dirPath, { recursive: true, force: true });
      spinner.stop();
    } else {
      // 交互模式 - 提示用户确认
      console.log(chalk.yellow(`⚠️ Project directory already exists!`));
      const { overwrite } = await inquirer.default.prompt(overwritePrompts);

      if (overwrite) {
        // 删除现有目录
        const spinner = ora.default(`Removing target directory (${dirPath})`).start();
        await fs.rmSync(dirPath, { recursive: true, force: true });
        spinner.stop();
      } else {
        // 用户取消操作
        console.log(chalk.yellow('⚠️ Operation cancelled'));
        process.exit(1);
      }
    }
  }

  // 创建目录
  fs.mkdirSync(dirPath);
  return true;
}

/**
 * 更新项目的package.json文件
 *
 * @param {string} projectDir - 项目目录路径
 * @param {string} projectName - 新的项目名称
 * @returns {Promise<boolean>} - 更新成功返回true，失败返回false
 */
async function updatePackageJson(projectDir, projectName) {
  try {
    const packageJsonPath = path.join(projectDir, 'package.json');

    if (await fs.pathExists(packageJsonPath)) {
      const packageJson = await fs.readJson(packageJsonPath);
      packageJson.name = projectName;

      // 写入更新后的内容
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      return true;
    }
    return false; // package.json不存在
  } catch (error) {
    // 错误处理
    console.error(chalk.red(`❌ Error updating package.json: ${error.message}`));
    return false;
  }
}

module.exports = {
  checkDirectoryExists,
  updatePackageJson,
};
