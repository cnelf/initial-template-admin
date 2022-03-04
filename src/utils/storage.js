// 设置 localStorage
export const setLocalStorage = (name, value, maxAge = 1000 * 60 * 30) =>
  window.localStorage.setItem(name, JSON.stringify({ value, maxAge, setTime: Date.now() }));

// 获取指定的 localStorage
export const getLocalStorage = (name) => {
  let retJson = null;
  try {
    retJson = JSON.parse(window.localStorage.getItem(name));
    if (retJson) {
      const isExpired = Date.now() > Number(retJson.setTime) + Number(retJson.maxAge);
      if (isExpired) {
        window.localStorage.removeItem(name);
        return null;
      } else {
        return retJson.value;
      }
    } else {
      return retJson;
    }
  } catch (err) {
    console.warn(err);
  }
  return retJson;
};

// 移除指定的 localStorage
export const removeLocalStorage = (name) => {
  window.localStorage.removeItem(name);
};
