import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterListComponent } from './features/chapter-list/chapter-list.component';
import { ChapterService } from './services/chapter.service';
import { HttpModule } from '@angular/http';
import { TafsirListComponent } from './features/tafsir-list/tafsir-list.component';
import { HadithCollectorsListComponent } from './features/hadith-collectors-list/hadith-collectors-list.component';
import { SearchComponent } from './features/search/search.component';
import { HelpComponent } from './features/help/help.component';
import { MainNavigatorComponent } from './components/main-navigator/main-navigator.component';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './features/not-found/not-found.component';
import { routes } from './features/routes';

@NgModule({
  declarations: [
    AppComponent,
    ChapterListComponent,
    MainNavigatorComponent,
    TafsirListComponent,
    HadithCollectorsListComponent,
    SearchComponent,
    HelpComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'QuranX'}),
    AppRoutingModule,
    HttpModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ChapterService
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
