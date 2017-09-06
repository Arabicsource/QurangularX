import { Route } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ShowVersesComponent } from './show-verses/show-verses.component';
import { routeMatchers } from './route-matchers';

export const routes: Route[] = [
    {
      path: '',
      component: ChapterListComponent
    },
    {
      component: ShowVersesComponent,
      matcher: routeMatchers.verses
    },
    {
      path: 'not-found',
      component: NotFoundComponent
    }
    ,
    {
      path: '**',
      redirectTo: 'not-found'
    }
  ];
