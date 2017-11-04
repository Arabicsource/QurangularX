export class VerseRange {
  public chapter: number;
  public firstVerse: number;
  public lastVerse?: number;

  constructor(params: VerseRange) {
    Object.assign(this, params);
    this.lastVerse = this.lastVerse || this.firstVerse;
    if (this.firstVerse > this.lastVerse) {
      const temp = this.firstVerse;
      this.firstVerse = this.lastVerse;
      this.lastVerse = temp;
    }
  }
}
