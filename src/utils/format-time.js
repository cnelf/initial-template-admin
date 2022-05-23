import dayjs from 'dayjs';

/**
 * 格式化时间
 * @param {Date | string | number} time
 * @param {string} str
 * @returns {string}
 */
export function formatTime(time, str = 'YYYY-MM-DD HH:mm:ss') {
  if (!time) return '';
  const m = dayjs(time);
  return m.isValid() ? m.format(str) : time;
}
