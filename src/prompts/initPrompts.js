/**
 * 项目基本配置问题集合
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
