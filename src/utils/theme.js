import { version } from 'element-ui/package.json';
const ORIGINAL_THEME = '#409eff'; // elementUI默认主题色
let chalk = ''; // theme-chalk的内容

// 等待下次事件循环再设置主题色
setTimeout(() => {
  const theme = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
  changeTheme(theme);
}, 0);

/**
 * 改变主题色
 * @param {string} color
 */
export async function changeTheme(color) {
  if (typeof color !== 'string') return;
  const theme = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
  const oldVal = chalk ? theme : ORIGINAL_THEME;
  const themeCluster = getThemeCluster(color.replace('#', ''));
  const originalCluster = getThemeCluster(oldVal.replace('#', ''));

  const getHandler = (id) => {
    return () => {
      const originalCluster = getThemeCluster(ORIGINAL_THEME.replace('#', ''));
      const newStyle = updateStyle(chalk, originalCluster, themeCluster);
      let styleTag = document.getElementById(id);
      if (!styleTag) {
        styleTag = document.createElement('style');
        styleTag.setAttribute('id', id);
        const node = document.body.firstChild;
        document.body.insertBefore(styleTag, node);
      }
      styleTag.innerText = newStyle;
    };
  };

  if (!chalk) {
    const url = `https://unpkg.com/element-ui@${version}/lib/theme-chalk/index.css`;
    await getCSSString(url, 'chalk');
  }

  const chalkHandler = getHandler('chalk-style');
  chalkHandler();
  const styles = [].slice.call(document.querySelectorAll('style')).filter((style) => {
    const text = style.innerText;
    return new RegExp(oldVal, 'i').test(text) && !/Chalk Variables/.test(text);
  });

  styles.forEach((style) => {
    const { innerText } = style;
    if (typeof innerText !== 'string') return;
    style.innerText = updateStyle(innerText, originalCluster, themeCluster);
  });

  document.documentElement.style.setProperty('--color-primary', color);
}

function updateStyle(style, oldCluster, newCluster) {
  let newStyle = style;
  oldCluster.forEach((color, index) => {
    newStyle = newStyle.replace(new RegExp(color, 'ig'), newCluster[index]);
  });
  return newStyle;
}

function getCSSString(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        chalk = xhr.responseText.replace(/@font-face{[^}]+}/, '');
        resolve();
      }
    };
    xhr.open('GET', url);
    xhr.send();
  });
}

function getThemeCluster(theme) {
  const tintColor = (color, tint) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);
    if (tint === 0) {
      // when primary color is in its rgb space
      return [red, green, blue].join(',');
    } else {
      red += Math.round(tint * (255 - red));
      green += Math.round(tint * (255 - green));
      blue += Math.round(tint * (255 - blue));
      red = red.toString(16);
      green = green.toString(16);
      blue = blue.toString(16);
      return `#${red}${green}${blue}`;
    }
  };
  const shadeColor = (color, shade) => {
    let red = parseInt(color.slice(0, 2), 16);
    let green = parseInt(color.slice(2, 4), 16);
    let blue = parseInt(color.slice(4, 6), 16);
    red = Math.round((1 - shade) * red);
    green = Math.round((1 - shade) * green);
    blue = Math.round((1 - shade) * blue);
    red = red.toString(16);
    green = green.toString(16);
    blue = blue.toString(16);
    return `#${red}${green}${blue}`;
  };
  const clusters = [theme];
  for (let i = 0; i <= 9; i++) {
    clusters.push(tintColor(theme, Number((i / 10).toFixed(2))));
  }
  clusters.push(shadeColor(theme, 0.1));
  return clusters;
}
