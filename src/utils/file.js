const fs = require('fs-extra');
const chalk = require('chalk');
const { confirm, isCancel, cancel } = require('@clack/prompts');
const path = require('path');

const { overwritePrompt } = require('../prompts/initPrompts');

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
      await fs.rmSync(dirPath, { recursive: true, force: true });
    } else {
      // 交互模式 - 提示用户确认
      console.log(chalk.yellow(`Project directory already exists!`));
      const overwrite = await confirm(overwritePrompt);
      if (isCancel(overwrite)) {
        cancel('Operation cancelled');
        process.exit(0);
      }

      if (overwrite) {
        // 删除现有目录
        await fs.rmSync(dirPath, { recursive: true, force: true });
      } else {
        // 用户取消操作
        cancel('Operation cancelled');
        process.exit(1);
      }
    }
  }

  // 创建目录（包括所有父目录）
  try {
    fs.mkdirSync(dirPath, { recursive: true });
    return true;
  } catch (error) {
    cancel(`Project creation failed: ${error.message}`);
    process.exit(1);
  }
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
    cancel(`Error updating package.json: ${error.message}`);
    return false;
  }
}

/**
 * 解析项目路径
 *
 * @param {string} projectNameArg - 命令行传入的项目名称或路径
 * @param {string} projectName - 用户输入的项目名称
 * @returns {string} - 解析后的完整项目路径
 */
function resolveProjectPath(projectNameArg, projectName) {
  return projectNameArg && projectNameArg !== projectName
    ? path.resolve(projectNameArg) // 使用完整路径
    : path.resolve(process.cwd(), projectName); // 使用当前目录 + 项目名
}

module.exports = {
  checkDirectoryExists,
  updatePackageJson,
  resolveProjectPath,
};
