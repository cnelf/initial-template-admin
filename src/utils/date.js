// 根据传入的年月获取到当前年月的第一天，即一号的日期格式
export function getPointDay(year, month, day) {
  return new Date(year, month, day);
}

// 传入时间戳格式日期，返回对应年日月
export const getYearMonthDay = (time = new Date()) => {
  const base = new Date(time);
  return {
    y: base.getFullYear(),
    m: base.getMonth() + 1,
    d: base.getDate()
  };
};

// 比较两个日期年月是否相同
export const isSameYM = (compareDay, baseDay = new Date()) => {
  const { y: y1, m: m1 } = getYearMonthDay(compareDay);
  const { y: y2, m: m2 } = getYearMonthDay(baseDay);
  return y1 === y2 && m1 === m2;
};

// 比较两个日期年月日是否相同
export const isSameYMD = (compareDay, baseDay = new Date()) => {
  const { y: y1, m: m1, d: d1 } = getYearMonthDay(compareDay);
  const { y: y2, m: m2, d: d2 } = getYearMonthDay(baseDay);
  return y1 === y2 && m1 === m2 && d1 === d2;
};
