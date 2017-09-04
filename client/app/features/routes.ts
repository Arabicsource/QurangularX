import { Route } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

export const routes: Route[] = [
  {
    path: '',
    component: ChapterListComponent
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
