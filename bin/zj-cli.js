#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');

// 设置版本号
program.version(pkg.version, '-v, --version');

// 解析命令行参数
program.parse(process.argv);

// 如果没有提供任何命令，显示帮助信息
if (!process.argv.slice(2).length) {
  console.log(chalk.bold.blue('\n 🚀 Welcom to use ZJ-CLI \n'));
  program.outputHelp((txt) => chalk.cyan(txt));
  console.log('\n run ' + chalk.green('zj-cli init') + chalk.gray(' - Initialize a new project \n'));
}