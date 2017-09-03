import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterListComponent } from './chapter-list/chapter-list.component';

const routes: Routes = [
  {
    path: '',
    component: ChapterListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
