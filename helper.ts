import fs from 'node:fs';

/**
 * 删除文件中指定的行号范围
 * @param {string} filePath 文件路径
 * @param {number} startLine 开始行号（从1开始）
 * @param {number} endLine 结束行号（从1开始）
 */
export const deleteLinesInRange = (filePath, startLine, endLine) => {
  console.log(filePath);
  // 读取文件内容
  const fileContent = fs.readFileSync(filePath, 'utf-8');

  // 将文件内容按行拆分成数组
  const lines = fileContent.split('\n');

  // 删除指定范围的行（注意要从 0 开始计算，所以要减 1）
  const newLines = [
    ...lines.slice(0, startLine - 1), // 保留开始行之前的行
    ...lines.slice(endLine), // 保留结束行之后的行
  ];

  // 将修改后的内容写回文件
  fs.writeFileSync(filePath, newLines.join('\n'), 'utf-8');
};

export const getLines = (filePath, lineNumber) => {
  const data = fs.readFileSync(filePath, 'utf-8'); // 同步读取文件内容
  const lines = data.split('\n'); // 将文件内容按行拆分
  return lines[lineNumber - 1]; // 返回指定行内容
};

export default {};
