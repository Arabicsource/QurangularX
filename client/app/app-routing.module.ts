import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChapterListComponent } from './features/chapter-list/chapter-list.component';
import { TafsirListComponent } from './features/tafsir-list/tafsir-list.component';
import { HadithCollectorsListComponent } from './features/hadith-collectors-list/hadith-collectors-list.component';
import { SearchComponent } from './features/search/search.component';
import { HelpComponent } from './features/help/help.component';

const routes: Routes = [
  {
    path: '',
    component: ChapterListComponent
  },
  {
    path: 'tafsirs',
    component: TafsirListComponent
  },
  {
    path: 'hadiths',
    component: HadithCollectorsListComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'help',
    component: HelpComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
