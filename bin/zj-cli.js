#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');

/**
 * 设置CLI版本信息
 * @param {string} version - 从package.json获取的版本号
 * @param {string} flags - 版本查询标识(-v, --version)
 * @param {string} description - 版本命令描述
 */
program.version(pkg.version, '-v, --version', 'display the current version number');

/**
 * 设置默认用法提示
 * 当用户输入无效命令时显示
 */
program.usage('<command> [options]');

/**
 * 初始化命令配置
 * @command init - 初始化新项目
 * @description 初始化Vue或React项目
 */
program
  .command('init')
  .description('Initialize a new Vue or React project');

/**
 * 默认命令处理
 * 当用户未输入任何命令时显示帮助信息
 */
program
  .arguments('[command]')
  .action((cmd) => {
    if (!cmd) {
      console.log(chalk.bold.blue('\n 🚀 Welcome to use ZJ-CLI \n'));
      program.outputHelp(txt => txt);
      console.log('\n run ' + chalk.green('zj-cli init') + chalk.gray(' - Initialize a new project \n'));
    }
  });

// 解析命令行参数
program.parse(process.argv);
