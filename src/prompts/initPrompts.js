/**
 * @file initPrompts.js
 * @description 项目初始化相关的所有交互提示
 */

/**
 * 项目基本配置问题
 * 用于收集用户在创建新项目时的基本配置选项
 * @type {Array<Object>}
 */
const projectConfigPrompts = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project Name:',
    default: 'my-project',
    validate: (input) => {
      if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
      return '项目名称只能包含字母、数字、连字符和下划线';
    },
  },
  {
    type: 'list',
    name: 'framework',
    message: 'Select a framework:',
    choices: ['Vue', 'React'],
    default: 'Vue',
  },
  {
    type: 'confirm',
    name: 'needI18n',
    message: 'Do you need i18n support?',
    default: true,
  },
];

/**
 * 覆盖确认问题
 * 当项目目录已存在时，询问用户是否要覆盖
 * @type {Array<Object>}
 */
const overwritePrompts = [
  {
    type: 'confirm',
    name: 'overwrite',
    message: 'Continue will overwrite the folder',
  },
];

module.exports = {
  projectConfigPrompts,
  overwritePrompts,
};
