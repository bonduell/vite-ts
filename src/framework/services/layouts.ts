export enum Thresholds {
  xs = 0,
  lg = 1936,
  md = 1360,
  xl = 2576,
  sm = 600,
}

type IKeyOfThresholds = keyof typeof Thresholds;

export class LayoutService {
  constructor() {
    const thresholds = Object.keys(Thresholds).filter(key => !Number(key) && key !== '0') as Array<IKeyOfThresholds>;
    this.thresholds = thresholds.sort((a, b) => Thresholds[a] - Thresholds[b]);
    this.screenSizes = (Object.keys(Thresholds) as Array<string | number>).filter(
      size => Number(size) || size === '0',
    ) as Array<number>;

    this.addMediaListeners();
    this.setNewScreenSize();
  }

  protected screenSizes!: number[];
  protected thresholds!: IKeyOfThresholds[];

  public screenSize!: IKeyOfThresholds;

  protected calcScreenSize(): IKeyOfThresholds {
    let [newScreenSize] = this.thresholds;
    this.screenSizes.forEach((size: number) => {
      const mediaQuery = matchMedia(`(min-width: ${size}px)`);

      if (mediaQuery.matches) {
        newScreenSize = Thresholds[size] as IKeyOfThresholds;
      }
    });
    return newScreenSize as IKeyOfThresholds;
  }

  protected setNewScreenSize = (): void => {
    this.screenSize = this.calcScreenSize();

    console.log('new screen size: ', this.screenSize);
    console.log('resolution starts from: ', `${Thresholds[this.screenSize]}px`);
  };

  protected addMediaListeners(): void {
    this.screenSizes.forEach((size: number) => {
      const mediaQuery = matchMedia(`(min-width: ${size}px)`);
      mediaQuery.addEventListener('change', this.setNewScreenSize);
    });
  }
}

const layoutService = new LayoutService();
export default layoutService;
