import { routeMatchers } from './route-matchers';

export const routeParams = {
  verses: {
    key: 'verses',
    extractRegex: new RegExp('(\\d+)\\.(\\d+)-?(\\d+)?'),
    matcher: routeMatchers.verses
  }
};


