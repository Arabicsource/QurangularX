import { NgModule } from '@angular/core';
import { AppBrowserModule } from './app.browser.module';
import { AppComponent } from './app.component';
import { ServerModule } from '@angular/platform-server';

@NgModule({
  imports: [
    ServerModule,
    AppBrowserModule
  ],
  bootstrap: [AppComponent]
})
export class AppServerModule { }
