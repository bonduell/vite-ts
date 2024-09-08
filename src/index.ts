import { UX_FW } from '@/types';

import '@/assets/scss/style.scss';
import App from '@/framework/application';
import { config } from '@/config/data';
import Component from '@/framework/component';

const element: UX_FW.IHtmlElement = {
  id: 'msg3',
  tag: 'span',
  props: {
    style: {},
    attrs: {
      textContent: 'Buddy!',
      className: 'grid-area-footer color-warning',
    },
  },
};

const app = App.createApp(config);
app.mount();

const span = App.byId('msg2') as Component;
const button = App.byId('btn1') as Component;

button.on('click', handleButtonClick);

let btnStatus: 'clicked' | 'none' = 'none';

function handleButtonClick(): void {
  if (btnStatus === 'clicked') {
    button.props.attrs.className = 'grid-area-body color-warning';
    span.props.attrs.className = 'grid-area-footer';
    span.props.attrs.textContent = 'Nice to meet you!';
    btnStatus = 'none';
  } else {
    btnStatus = 'clicked';
    button.props.attrs.className = 'grid-area-body color-success';
    span.props.attrs.className = 'grid-area-footer color-success';
    span.props.attrs.textContent = 'Nice to meet you again, ';
    span.props.children?.push(element);
  }
}
