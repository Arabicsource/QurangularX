import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterService } from './services/chapter.service';
import { HttpModule } from '@angular/http';
import { CollapseModule } from 'ngx-bootstrap';
import { MainNavigatorComponent } from './main-navigator/main-navigator.component';
import { TafsirListComponent } from './tafsir-list/tafsir-list.component';
import { HadithCollectorsListComponent } from './hadith-collectors-list/hadith-collectors-list.component';
import { SearchComponent } from './search/search.component';
import { HelpComponent } from './help/help.component';

@NgModule({
  declarations: [
    AppComponent,
    ChapterListComponent,
    MainNavigatorComponent,
    TafsirListComponent,
    HadithCollectorsListComponent,
    SearchComponent,
    HelpComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'QuranX'}),
    AppRoutingModule,
    HttpModule,
    CollapseModule
  ],
  providers: [
    ChapterService
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
