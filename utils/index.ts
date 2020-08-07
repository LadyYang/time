/**
 * 将所有类名组合起来
 * @param names
 */
export const mergeClass = (...names: Array<string | null | undefined>) =>
  names.join(' ');

export const isBrowser = () => typeof window !== 'undefined';

/**
 * 显示加载状态
 */
export const loading = {
  el: null,
  show() {
    const container = document.createElement('div');

    const style: Partial<CSSStyleDeclaration> = {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'fixed',
      top: '0',
      bottom: '0',
      left: '0',
      right: '0',
      zIndex: '9999',
      background: 'rgba(0,0,0,.2)',
      userSelect: 'none',
    };

    Object.keys(style).forEach((k: any) => (container.style[k] = style[k]!));

    // React.createElement(Loading);
    // to do ....
  },
  close() {},
};

/**
 * 格式化显示时间
 * @param time 默认为当前时间戳
 */
export const formatDate = (time: Date | number | string = Date.now()) => {
  time = new Date(time);
  const t = new Intl.DateTimeFormat('zh-u-chinese', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  });

  return t.format(time);
};

export const getCookie = (key: string) => {
  let start = document.cookie.indexOf(key + '=');
  let len = start + key.length + 1;
  if (!start && key !== document.cookie.substring(0, key.length)) {
    return null;
  }
  if (start === -1) return null;
  let end = document.cookie.indexOf(';', len);
  if (end === -1) end = document.cookie.length;
  return unescape(document.cookie.substring(len, end));
};
