export class Chapter {
  public chapterNumber: number;
  public arabicName: string;
  public englishName: string;
  public numberOfVerses: number;

  constructor(params: Chapter) {
    Object.assign(this, params);
  }
}
