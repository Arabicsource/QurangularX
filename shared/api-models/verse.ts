import { Translation } from './translation';

export class Verse {
  public chapter: number;
  public verse: number;
  public translations: Translation[];
  public numberOfHadiths: number;
  public numberOfTafsirs: number;
  public numberOfRoots: number;

  constructor(params: Verse) {
    Object.assign(this, params);
  }
}
