export class Chapter {
  public chapter: number;
  public arabicName: string;
  public englishName: string;
  public numberOfVerses: number;

  constructor(params: Chapter) {
    Object.assign(this, params);
  }
}

