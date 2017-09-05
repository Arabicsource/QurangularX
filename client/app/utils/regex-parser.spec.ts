

import { regexParse } from './regex-parser';

describe('regexParse', () => {
  it('should return all matches', () => {
    const matches = regexParse('2.1,3.2', /(\d+)\.(\d+)/g);
    expect(matches.length).toEqual(2);
    expect(matches[0][0]).toEqual('2.1');
    expect(matches[0][1]).toEqual('2');
    expect(matches[0][2]).toEqual('1');
    expect(matches[1][0]).toEqual('3.2');
    expect(matches[1][1]).toEqual('3');
    expect(matches[1][2]).toEqual('2');
  });
});
