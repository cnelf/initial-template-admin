import dayjs from 'dayjs';

/**
 * 获取随机字符串
 * @returns {string}
 */
export function randomString() {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * 获取随机文件名称
 * @param {string} fileName 文件名称
 * @returns {string}
 */
export function randomFileName(fileName) {
  return [dayjs().format('YYMMDD'), randomString(), fileName].filter(Boolean).join('_');
}
