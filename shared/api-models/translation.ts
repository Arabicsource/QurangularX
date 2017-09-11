import { Translator } from './translator';

export class Translation {
  public translator: Translator;
  public text: string;

  constructor(params: Translation) {
    Object.assign(this, params);
  }
}
