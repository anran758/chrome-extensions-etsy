const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const conf = require("../conf/index.js");

/**
 * 从指定目录下获取所有的文件名列表
 */
const getNamesInFolder = (target) => {
  try {
    return fs.readdirSync(target);
  } catch (err) {
    return [];
  }
}

/**
 * 获取模板路径
 * @desc 若模板存在，则返回模板路径。若模板不存在则返回空字符串
 */
const getTemplatePath = (filePath) => {
  // 文件存在
  if (fs.existsSync(filePath)) return filePath;

  // 没有模板
  return '';
}

/**
 * 将指定目录下的 HTML 封装为插件
 * @Tips 或许将 entry 与 template 拆分生成会更好
 */
const getHtmlOptions = (folderPath) => {
  const tempFolderPath = folderPath || conf.templateFolder;
  const tempNames = getNamesInFolder(tempFolderPath);
  const entry = {}
  const plugins = []

  tempNames.forEach((filename) => {
    const stats = fs.statSync(path.resolve(tempFolderPath, filename));
    if (!stats.isFile()) return;

    const extension = path.extname(filename);
    const name = filename.slice(0, -extension.length)
    const tempPath = getTemplatePath(path.join(tempFolderPath, filename));

    const entryPath = path.join(conf.srcRoot, 'js', `${name}.js`);
    const chunkname = `${name}`;
    if (fs.existsSync(entryPath)) {
      entry[chunkname] = entryPath;
    }

    plugins.push(
      new HtmlWebpackPlugin({
        filename,
        inject: true,

        // 只包含 common 以及自己的那一个 chunk
        chunks: ['common', chunkname],

        // 模板路径
        ...(tempPath ? { template: tempPath } : { title: 'Document' })
      })
    );
  })

  return {
    entry,
    plugins
  }
}

module.exports = {
  getNamesInFolder,
  getHtmlOptions
}
