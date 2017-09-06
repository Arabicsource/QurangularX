import { Route, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { RegexUrlMatcher } from '../utils/regex.url-matcher';

export const routeMatchers = {
  verses(segments: UrlSegment[], segmentGroup: UrlSegmentGroup, route: Route): UrlMatchResult {
    return RegexUrlMatcher('verses', new RegExp('^\\d+\\.\\d+(-\\d+)?(,\\d+\.\\d+(-\\d+)?)*$'))(segments, segmentGroup, route);
  }
}
