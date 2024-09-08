import { UX_FW } from '@/types';

import '@/assets/scss/style.scss';
import App from '@/framework/application';
import { config } from '@/config/data';
import Component from '@/framework/component';

const props1: UX_FW.IHtmlElementProps = {
  style: {},
  attrs: {
    className: 'grid-area-footer',
    textContent: 'Nice to meet you again, ',
  },
  children: [
    {
      id: 'msg3',
      tag: 'span',
      props: {
        style: {},
        attrs: {
          textContent: 'Buddy!',
          className: 'grid-area-footer color-warning',
        },
      },
    },
  ],
};

const app = App.createApp(config);
app.mount();

const span = App.byId('msg2') as Component;
const button = App.byId('btn1') as Component;

//@ts-ignore
const props2 = config.elements.props.children[2].props;

button.on('click', handleButtonClick);

let btnStatus: 'clicked' | 'none' = 'none';

function handleButtonClick(): void {
  if (btnStatus === 'clicked') {
    button.props.attrs.className = 'grid-area-body color-warning';
    span.props.attrs = props2.attrs;
    span.props.style = props2.style;
    btnStatus = 'none';
  } else {
    btnStatus = 'clicked';
    button.props.attrs.className = 'grid-area-body color-success';
    span.props.attrs = props1.attrs;
    span.props.style = props1.style;
    //@ts-ignore
    span.props.children.push(props1.children[0]);
  }
}
