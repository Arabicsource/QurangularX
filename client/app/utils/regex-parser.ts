export function regexParse(value: string, regex: RegExp) {
  let match = null;
  const result: RegExpExecArray[] = [];

  do {
    match = regex.exec(value);
    if (match) {
      result.push(match);
      value = value.substr(match.index + match[0].length);
    }
  }while (match);

  return result;
}
