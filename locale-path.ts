/* eslint-disable */
// @ts-nocheck
import path from 'path';
import { globSync } from 'glob';
import localezhCN from '@/locale/zh-CN';

export const locale = localezhCN;

// 遍历目录并处理文件
export const getFilesPath = (
  dirPath = path.join(__dirname, '..', '..', 'src')
) => {
  const someFilesPath = { filesPath: [], localeDirsPath: [] };

  // 获取所有的 locale 目录
  const patternDirs = path.join(dirPath, '**/');
  const dirsPathTemp = globSync(patternDirs);
  dirsPathTemp.forEach((dirPath) => {
    if (dirPath.endsWith('/locale')) {
      someFilesPath.localeDirsPath.push(dirPath);
    }
  });

  // 获取所有的 .vue, .ts, .js 文件（你可以根据需要修改扩展名）
  const pattern = path.join(dirPath, '**/*.{vue,ts,js}');
  const filesPathTemp = globSync(pattern);
  filesPathTemp.forEach((filePath) => {
    if (filePath.indexOf('/locale') === -1) {
      someFilesPath.filesPath.push(filePath);
    }
  });

  return someFilesPath;
};
