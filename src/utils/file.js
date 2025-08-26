const fs = require('fs-extra');
const chalk = require('chalk');
const ora = require('ora');
const inquirer = require('inquirer');
const path = require('path');

const { overwritePrompts } = require('../prompts/initPrompts'); // 覆盖确认提示

/**
 * 检查目录是否存在并处理冲突
 *
 * @description 该函数完成以下操作：
 * 1. 检查指定目录是否已存在
 * 2. 如果存在且force=true，直接删除目录
 * 3. 如果存在且force=false，询问用户是否覆盖
 * 4. 根据用户选择或force参数删除现有目录
 * 5. 创建新的空目录
 *
 * @async
 * @param {string} dirPath - 要检查的目录路径
 * @param {boolean} force - 如果为true，则直接覆盖目录而不询问用户
 * @returns {Promise<boolean>} - 操作成功返回true；用户取消则退出程序
 */
async function checkDirectoryExists(dirPath, force = false) {
  // 检查目录是否已存在
  if (fs.existsSync(dirPath)) {
    if (force) {
      // 场景1: 强制模式 - 直接删除目录无需确认
      const spinner = ora.default(`Force removing target directory (${dirPath})`).start();
      await fs.rmSync(dirPath, { recursive: true, force: true }); // 递归删除目录及其内容
      spinner.stop();
    } else {
      // 场景2: 交互模式 - 提示用户并等待确认
      console.log(chalk.yellow(`⚠️ Project directory already exists!`));

      // 使用inquirer提示用户选择是否覆盖
      const { overwrite } = await inquirer.default.prompt(overwritePrompts);

      if (overwrite) {
        // 用户确认覆盖 - 删除现有目录
        const spinner = ora.default(`Removing target directory (${dirPath})`).start();
        await fs.rmSync(dirPath, { recursive: true, force: true });
        spinner.stop();
      } else {
        // 用户取消操作 - 终止程序执行
        console.log(chalk.red('❌ Operation cancelled'));
        process.exit(1);
      }
    }
  }

  // 创建新的空目录
  fs.mkdirSync(dirPath);
  return true;
}

/**
 * 更新项目的package.json文件
 *
 * @description 读取项目目录中的package.json文件，
 * 将其name字段更新为指定的项目名称，然后写回文件
 *
 * @async
 * @param {string} projectDir - 项目目录路径
 * @param {string} projectName - 新的项目名称
 * @returns {Promise<boolean>} - 更新成功返回true，失败返回false
 */
async function updatePackageJson(projectDir, projectName) {
  try {
    // 构建package.json文件的完整路径
    const packageJsonPath = path.join(projectDir, 'package.json');

    // 检查package.json文件是否存在
    if (await fs.pathExists(packageJsonPath)) {
      // 读取现有的package.json文件内容
      const packageJson = await fs.readJson(packageJsonPath);

      // 更新项目名称
      packageJson.name = projectName;

      // 写入更新后的内容，保持2空格缩进格式
      await fs.writeJson(packageJsonPath, packageJson, { spaces: 2 });
      return true;
    }
    return false; // package.json不存在
  } catch (error) {
    // 错误处理 - 输出错误信息但不中断程序
    console.error(chalk.red(`❌ Error updating package.json: ${error.message}`));
    return false;
  }
}

module.exports = {
  checkDirectoryExists,
  updatePackageJson,
};
