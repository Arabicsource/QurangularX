export function regexParse(value: string, regex: RegExp) {
  let match = null;
  const result: RegExpExecArray[] = [];

  do {
    match = regex.exec(value);
    if (match) {
      result.push(match);
    }
  }while (match);

  return result;
}
