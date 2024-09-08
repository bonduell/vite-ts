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
      innerText: 'Buddy!',
      className: 'grid-area-footer color-warning',
    },
  },
};

const app = App.createApp(config);
app.mount();

const button = App.byId('btn1') as Component;
button.on('click', handleButtonClick);
let btnStatus: 'clicked' | 'none' = 'none';

//@ts-ignore
const configButton = config.elements.props.children[0];
//@ts-ignore
const configSpan = config.elements.props.children[2];

function handleButtonClick(): void {
  if (btnStatus === 'clicked') {
    configButton.props.attrs.className = 'grid-area-body color-warning';
    configSpan.props.attrs.className = 'grid-area-footer';
    btnStatus = 'none';
  } else {
    btnStatus = 'clicked';
    configButton.props.attrs.className = 'grid-area-body color-success';
    configSpan.props.attrs.className = 'grid-area-footer color-success';
    if (!configSpan.props.children?.find(item => item.id === 'msg3')) {
      configSpan.props.attrs.innerText = 'Nice to meet you again, ';
      configSpan.props.children?.push(element);
    }
  }
}
