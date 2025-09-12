/**
 * 项目基本配置问题集合
 */
const projectConfigPrompts = {
  projectName: {
    type: 'text',
    message: 'Project Name:',
    placeholder: 'my-project',
    defaultValue: 'my-project',
    validate: (value) => {
      return value.length === 0 || value.trim().replace(/\/+$/g, '').length > 0 ? undefined : 'Invalid project name';
    },
  },
  framework: {
    type: 'select',
    message: 'Select a framework:',
    options: [
      { value: 'Vue', label: 'Vue' },
      { value: 'React', label: 'React' },
    ],
    initialValue: 'Vue',
  },
  needI18n: {
    type: 'confirm',
    message: 'Do you need i18n support?',
    initialValue: true,
  },
};

/**
 * 覆盖确认问题
 */
const overwritePrompt = {
  type: 'confirm',
  message: 'Continue will overwrite the folder',
  initialValue: false,
};

/**
 * 处理用户取消操作
 *
 * @param {any} value - 用户输入值
 * @param {Function} isCancel - 检查是否取消的函数
 * @param {Function} cancel - 取消函数
 * @returns {any} 如果未取消则返回原值
 */
const handleCancel = (value, isCancel, cancel) => {
  if (isCancel(value)) {
    cancel('Operation cancelled');
    process.exit(0);
  }
  return value;
};

/**
 * 收集用户输入的项目配置信息
 *
 * @param {string} projectNameArg - 命令行传入的项目名称或路径
 * @returns {Promise<Object>} 包含projectName、framework和needI18n的对象
 */
const collectUserInput = async (projectNameArg) => {
  const { text, select, confirm, isCancel, cancel } = require('@clack/prompts');
  const path = require('path');

  // 定义提示配置和对应的提示函数
  const promptConfigs = [
    {
      key: 'projectName',
      prompt: projectNameArg
        ? { ...projectConfigPrompts.projectName, initialValue: projectNameArg }
        : projectConfigPrompts.projectName,
      fn: projectNameArg ? () => Promise.resolve(projectNameArg) : text,
    },
    { key: 'framework', prompt: projectConfigPrompts.framework, fn: select },
    { key: 'needI18n', prompt: projectConfigPrompts.needI18n, fn: confirm },
  ];

  // 使用循环遍历收集用户输入
  const result = {};
  for (const { key, prompt, fn } of promptConfigs) {
    // 如果是项目名称且已通过命令行提供，则直接使用
    if (key === 'projectName' && projectNameArg) {
      // 如果是路径，提取最后一部分作为项目名称
      const basename = path.basename(projectNameArg);
      result[key] = basename;
    } else {
      result[key] = handleCancel(await fn(prompt), isCancel, cancel);
    }
  }

  return result;
};

module.exports = {
  projectConfigPrompts,
  overwritePrompt,
  collectUserInput,
};
