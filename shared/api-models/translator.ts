export class Translator {
  public code: string;
  public name: string;
  public displayPriority: number;

  constructor(params: Translator) {
    Object.assign(this, params);
  }
}
