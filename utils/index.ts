/**
 * 将所有类名组合起来
 * @param names
 */
export const mergeClass = (...names: Array<string | null>) => names.join(' ');

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
