import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { DbProvider } from '../../providers/db';
import { RequestProvider } from '../../providers/request';
import { InfoPage } from '../info/info';
import { ContentPage } from '../content/content';
import { Language } from '../../interfaces';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {
  languages: Array<Language> = [];
  
  constructor(public nav: NavController,
  public db: DbProvider,
  public request: RequestProvider) {}

  ionViewWillEnter() {
    this.languages = this.db.languages.find({ favorite: true });
  }

  openInfoPage() {
    this.request.fetchReadMe()
    .then((readme: string) => {
      this.nav.push(InfoPage, { readme });
    });
  }

  openContentpage(content) {
    this.nav.push(ContentPage, { content });
  }
}
