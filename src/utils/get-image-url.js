const RES_DOMAIN = import.meta.env.VITE_RES_DOMAIN;
const QI_NIU_DOMAIN = import.meta.env.VITE_QI_NIU_DOMAIN;

/**
 * 获取图片的绝对路径
 * @param {string} path
 * @returns {string}
 */
export const getImageUrl = (path = '') => {
  if (!path) return path;
  if (/^https?:\/\/(.*)/.test(path)) {
    return path;
  } else if (path.indexOf('#qiniu') > -1) {
    return QI_NIU_DOMAIN + path;
  } else {
    return RES_DOMAIN + path;
  }
};
