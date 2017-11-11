import { Route, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { RegexUrlMatcher } from '../../../shared/utils/regex.url-matcher';

export const routeMatchers = {
  analysis(segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult {
    if (segments.length !== 2 || segments[0].path.toLowerCase() !== 'analysis') {
      return null;
    }

    const pattern = /^(\d+)\.(\d+)$/;
    const matches = pattern.exec(segments[1].path);
    if (matches.length !== 3) {
      return null;
    }

    const posParams: { [key: string]: UrlSegment } = {};
    posParams['chapter'] = new UrlSegment(matches[1], null);
    posParams['verse'] = new UrlSegment(matches[2], null);
    const consumed = segments;
    return { consumed, posParams };
  },
  verses(segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult {
    return RegexUrlMatcher('verses', new RegExp('^\\d+\\.\\d+(-\\d+)?(,\\d+\.\\d+(-\\d+)?)*$'))(segments, segmentGroup, route);
  }
}
