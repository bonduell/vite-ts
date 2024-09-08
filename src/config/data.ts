import { UX_FW } from '@/types';

const elements: UX_FW.IHtmlElement = {
  id: 'wrapper',
  tag: 'div',
  props: {
    style: {
      paddingTop: '32px',
      paddingBottom: '32px',
    },
    attrs: {
      className: 'root-wrapper bold',
    },
    children: [
      {
        id: 'btn1',
        tag: 'button',
        props: {
          style: {},
          attrs: {
            innerText: 'Click Me',
            className: 'grid-area-body color-warning',
          },
          xs: {},
          md: {},
        },
      },
      {
        id: 'msg1',
        tag: 'span',
        props: {
          style: {},
          attrs: {
            id: 'msg1',
            innerText: 'Hello World',
            className: 'grid-area-header',
          },
        },
      },
      {
        id: 'msg2',
        tag: 'div',
        props: {
          style: {},
          attrs: {
            innerText: 'Nice to meet you!',
            className: 'grid-area-footer',
          },
          children: [],
        },
      },
    ],
  },
};

const config: UX_FW.IInitialConfig = {
  settings: {
    cssText: `.color-warning{color:red}.color-success{color:green};`,
    screenResolution: 'md', // Threshold are out of scope
  },
  elements,
};

export { config };
