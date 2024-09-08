export default class Sanitizer {
  constructor() {
    // out of scope but required
  }

  protected prohibitedTags = ['a'];

  public isTagAllowed(tag: string): boolean {
    return !this.prohibitedTags.includes(tag);
  }
}
