import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChapterListComponent } from './chapter-list/chapter-list.component';
import { ChapterService } from './services/chapter.service';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    ChapterListComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'QuranX'}),
    AppRoutingModule,
    HttpModule
  ],
  providers: [
    ChapterService
  ],
  bootstrap: [AppComponent]
})
export class AppBrowserModule {
}
