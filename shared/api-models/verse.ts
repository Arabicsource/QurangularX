export class Verse {
  public chapterNumber: number;
  public verseNumber: number;

  constructor(params: Verse) {
    Object.assign(this, params);
  }
}
