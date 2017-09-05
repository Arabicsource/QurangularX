import { Route } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowVersesComponent } from './show-verses/show-verses.component';
import { RegexUrlMatcher } from '../utils/regex.url-matcher';
import { routeParams } from './route-params';

export const routes: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    component: ChapterListComponent
  },
  {
    component: ShowVersesComponent,
    matcher: RegexUrlMatcher(routeParams.verses.key, routeParams.verses.urlRegex)
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }

];
