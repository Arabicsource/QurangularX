import { Translation } from './translation';

export interface Verse {
  chapter: number;
  verse: number;
  translations: Translation[];
  numberOfHadiths: number;
  numberOfTafsirs: number;
  numberOfRoots: number;
}
