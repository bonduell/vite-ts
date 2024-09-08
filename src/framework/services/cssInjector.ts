export class CssInjector {
  constructor() {
    document.adoptedStyleSheets = [this.cssStyleSheet];
  }

  cssStyleSheet: CSSStyleSheet = new CSSStyleSheet();

  public applyCSSStyleSheet(cssText: string): void {
    this.cssStyleSheet.replaceSync(cssText);
  }
}

const cssInjector = new CssInjector();
export default cssInjector;
