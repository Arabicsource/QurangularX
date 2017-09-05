export class VerseRange {
  public chapterNumber: number;
  public firstVerse: number;
  public lastVerse?: number;

  constructor(params: VerseRange) {
    Object.assign(this, params);
  }
}
