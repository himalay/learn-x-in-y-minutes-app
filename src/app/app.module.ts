import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';
import { InfoPage } from '../pages/info/info';
import { DbProvider } from './../providers/db';

@NgModule({
  declarations: [
    MyApp,
    CollectionPage,
    ContentPage,
    InfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CollectionPage,
    ContentPage,
    InfoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DbProvider]
})
export class AppModule {}
