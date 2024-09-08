export namespace UX_FW {
  export interface IHtmlElement {
    id: string;
    tag: string;
    props: IHtmlElementProps;
  }

  type ICSSBaseStyle = Omit<
    CSSStyleDeclaration,
    'getPropertyPriority' | 'getPropertyValue' | 'item' | 'removeProperty' | 'setProperty'
  >;

  interface ICSSStyle extends ICSSBaseStyle {
    [index: string]: string;
  }

  interface IHtmlElementAttrs {
    id?: string;
    textContent?: string;
    className?: string;
  }

  export interface IHtmlElementProps {
    attrs: IHtmlElementAttrs;
    xs?: IHtmlElementAttrs;
    md?: IHtmlElementAttrs; // todo extends Thresholds
    children?: Array<IHtmlElement>;
    style: Partial<ICSSStyle>;
  }

  export interface IConfigSettings {
    screenResolution: 'md';
    cssText: string;
  }

  export interface IInitialConfig {
    settings: IConfigSettings;
    elements: IHtmlElement;
  }
}
