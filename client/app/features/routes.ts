import { Route } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowVersesComponent } from './show-verses/show-verses.component';
import { routeMatchers } from './route-matchers';
import { AnalysisComponent } from './analysis/analysis.component';

export const routes: Route[] = [
  {
    path: '',
    component: ChapterListComponent
  },
  {
    path: 'analysis',
    component: AnalysisComponent
  },
  {
    component: ShowVersesComponent,
    matcher: routeMatchers.verses
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];
