/**
 * 延迟函数
 * @param {number} duration
 * @returns {Promise}
 */
export function sleep(duration = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
