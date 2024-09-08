import { UX_FW } from '@/types';
import { paramCase } from 'change-case';
import Sanitizer from '@/framework/services/sanitizer';
import reactive from '@/framework/services/reactive';

const sanitizer = new Sanitizer();

export default class Component {
  readonly id: string;
  readonly tag: string;
  readonly $el: HTMLElement;
  readonly props: UX_FW.IHtmlElementProps;
  protected children: Array<Component> = [];

  constructor(initial: UX_FW.IHtmlElement) {
    this.id = initial.id;
    this.tag = initial.tag;
    this.props = initial.props;

    this.$el = document.createElement(this.tag);

    // a reactive approach is used
    initial.props.style = reactive(initial.props.style, this.setCSSStyle);
    initial.props.attrs = reactive(initial.props.attrs, this.setHtmlAttrs);
    initial.props.children = reactive(initial.props.children || [], this.addChild);
  }

  protected setHtmlAttrs = (prop: string, value: string): boolean => {
    //@ts-ignore
    this.$el[prop] = value;
    return true;
  };

  protected setCSSStyles(style: Partial<UX_FW.ICSSStyle>): void {
    Object.keys(style).forEach(key => {
      const cssStyle = paramCase(key);
      const value = this.$el.style[key as never as number];
      this.setCSSStyle(cssStyle, value);
    });
  }

  protected setCSSStyle = (cssStyle: string, value: string): boolean => {
    this.$el.style.setProperty(cssStyle, value || null);
    return true;
  };

  protected renderChildren(): void {
    this.children.forEach(child => {
      const $el = child.render();
      this.$el.appendChild($el);
    });
  }

  public render(): HTMLElement {
    const { attrs, style, children } = this.props;

    Object.keys(attrs).forEach(prop => {
      const value = this.props.attrs[prop as keyof UX_FW.IHtmlElementAttrs];
      this.setHtmlAttrs(prop, value || '');
    });

    this.setCSSStyles(style);
    this.createChildren(children || []);

    this.renderChildren();

    return this.$el;
  }

  public byId(id: string): Component | undefined {
    if (this.id === id) return this;

    for (const child of this.children) {
      const result = child.byId(id);
      if (result) return result;
    }

    return undefined;
  }

  protected createChildren = (value: Array<UX_FW.IHtmlElement>): void => {
    this.children = value.reduce((acc, curr) => {
      if (sanitizer.isTagAllowed(curr.tag)) {
        acc.push(new Component(curr));
      }
      return acc;
    }, [] as Component[]);
  };

  protected addChild = (_: string, value: UX_FW.IHtmlElement): boolean => {
    if (value.tag && sanitizer.isTagAllowed(value.tag)) {
      this.children.push(new Component(value));
      this.renderChildren();
    }
    return true;
  };

  on(event: string, callbackFn: () => void): void {
    this.$el.addEventListener(event, callbackFn);
  }

  off(event: string, callbackFn: () => void): void {
    this.$el.removeEventListener(event, callbackFn);
  }
}
