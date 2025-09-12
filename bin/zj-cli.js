#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const pkg = require('../package.json');
const { init } = require('../src/index.js');

// 设置命令行使用格式
program.usage('<command> [options]');

// 配置 CLI 基本信息
program
  .name('zj-cli')
  .description(chalk.bold.blue('\n 🚀 A modern CLI for Vue and React projects \n'))
  .version(pkg.version, '-v, --version', 'display the current version number')
  .addHelpCommand('help', 'display help for command');

// 注册 init 命令
program
  .command('init [project-name]')
  .description('initialize a new Vue or React project')
  .option('-f, --force', 'force delete contents if target directory is not empty')
  .addHelpText(
    'after',
    `\nExamples: 
    ${chalk.cyan('zj-cli init')}                        # Create a new project with interactive prompt
    ${chalk.cyan('zj-cli init my-project')}             # Create a project named my-project
    ${chalk.cyan('zj-cli init ./folderPath/my-project')} # Create my-project in folderPath directory
    ${chalk.cyan('zj-cli init -f')}                     # Force create even if directory exists\n`,
  )
  .action((projectName, options) => init(projectName, options.force));

// 自定义帮助信息
program.on('--help', () => {
  console.log('\nrun ' + chalk.cyan('zj-cli <command> --help') + chalk.gray(' - for detailed command information \n'));
});

// 解析命令行参数并执行对应命令
program.parse(process.argv);
