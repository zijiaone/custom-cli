/**
 * 项目基本配置问题集合
 *
 * @description 用于收集用户在创建新项目时的基本配置选项，包括：
 * - 项目名称：限制只能包含字母、数字、连字符和下划线
 * - 框架选择：Vue或React
 * - 国际化支持：是否需要i18n功能
 *
 */
const projectConfigPrompts = [
  {
    type: 'input',
    name: 'projectName',
    message: 'Project Name:',
    default: 'my-project',
    validate: (input) => {
      if (/^[a-zA-Z0-9-_]+$/.test(input)) return true;
      return 'Project name can only contain letters, numbers, hyphens and underscores';
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
 *
 * @description 当目标项目目录已存在时，询问用户是否要覆盖现有目录
 * 防止覆盖用户现有的项目文件
 *
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
