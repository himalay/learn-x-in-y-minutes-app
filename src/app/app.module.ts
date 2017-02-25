import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';
import { InfoPage } from '../pages/info/info';
import { DbProvider } from './../providers/db';
import { MdProvider } from './../providers/md';

@NgModule({
  declarations: [
    MyApp,
    CollectionPage,
    ContentPage,
    InfoPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
     links: [
       { component: InfoPage, name: 'Readme', segment: 'readme' },
       { component: ContentPage, name: 'Content', segment: 'content' }
     ]
  })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CollectionPage,
    ContentPage,
    InfoPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, DbProvider, MdProvider]
})
export class AppModule {}
