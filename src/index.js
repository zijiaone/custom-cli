const { init } = require('./commands/init.js');

/**
 * 导出所有CLI命令
 * 当前支持的命令：
 * - init: 初始化新项目
 */
module.exports = {
  init,
};
