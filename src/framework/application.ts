import { UX_FW } from '@/types';
import Component from '@/framework/component';
import LayoutService from '@/framework/services/layouts';
import cssInjector from '@/framework/services/cssInjector';

// Singleton
export default class App {
  private static settings: UX_FW.IConfigSettings;
  private static elements: UX_FW.IHtmlElement;
  private static instance: App;
  private static rootEl: Component;

  static createApp(config: UX_FW.IInitialConfig) {
    App.elements = config.elements;
    App.settings = config.settings;
    return new App();
  }

  public static byId(id: string): Component | undefined {
    return App.rootEl.byId(id);
  }

  constructor() {
    if (!App.instance) {
      App.instance = this.initApp();
    }

    return App.instance;
  }

  private layoutService = new LayoutService();
  private $el = document.getElementById('root') as Element;

  private initApp(rootEl: UX_FW.IHtmlElement = App.elements): App {
    cssInjector.applyCSSStyleSheet(App.settings.cssText);
    App.rootEl = new Component(rootEl);
    return this;
  }

  public mount(): void {
    App.rootEl.render();
    this.$el.appendChild(App.rootEl.$el);

    console.log('App successfully mounted : ', this.layoutService.screenSize);
  }
}
