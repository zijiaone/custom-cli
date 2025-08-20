#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { init } = require('../src/index.js');

/**
 * 设置命令使用说明
 * @function usage
 * @param {string} usage - 使用说明格式
 */
program.usage('<command> [options]');

/**
 * 设置CLI版本号
 * @function version
 * @param {string} version - 从package.json获取的版本号
 * @param {string} flags - 命令行标志
 * @param {string} description - 版本命令的描述信息
 */
program.version(pkg.version, '-v, --version', 'display the current version number');

/**
 * 注册init命令
 * @name init
 * @description 用于初始化新的Vue或React项目
 */
program
  .command('init')
  .description('Initialize a new Vue or React project')
  .action(() => init());

/**
 * 处理命令行参数
 * @function arguments
 * @param {string} args - 命令参数格式
 * @param {Function} callback - 处理命令的回调函数
 * @description 当用户没有输入任何命令时，显示欢迎信息和帮助提示
 */
program.arguments('[command]').action((cmd) => {
  if (!cmd) {
    // 如果没有输入命令，显示欢迎信息
    console.log(chalk.bold.blue('\n 🚀 Welcome to use ZJ-CLI \n'));
    // 输出帮助信息
    program.outputHelp((txt) => txt);
    // 显示init命令的提示
    console.log('\n run ' + chalk.green('zj-cli init') + chalk.gray(' - Initialize a new project \n'));
  }
});

/**
 * 解析命令行参数
 * @function parse
 * @param {Array} argv - 命令行参数数组
 */
program.parse(process.argv);
