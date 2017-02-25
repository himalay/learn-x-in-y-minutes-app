import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';
import { Language } from '../interfaces';
import { DbProvider } from '../providers/db';
import { RequestProvider } from '../providers/request';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionPage;

  languages: Array<Language>;
  temp: any;

  constructor(public platform: Platform,
  public db: DbProvider,
  public request: RequestProvider) {
    this.initializeApp();
    this.fetchAndSetlanguage();
    this.request.isOnline$
      .subscribe(isOnline => {
        if (isOnline && !this.db.languages.data.length) {
          this.request.fetchLanguages().then(() => {
              this.fetchAndSetlanguage();
          });
        }
      });
  }

  setLanguages () {
    this.languages = this.temp;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  fetchAndSetlanguage() {
    this.request.fetchLanguages()
    .then(() => {
        this.temp = this.db.toArray(this.db.languages.data);
        this.setLanguages();
    });
  }

  filterItems(ev) {
    this.setLanguages();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.languages = this.languages.filter(({title}) => title.toLowerCase().includes(val.toLowerCase()));
    }
  }

  openContentPage(language: Language) {
    this.request.fetchContent(language)
    .then(() => {
      let content = this.db.languages.find({ $loki: language.$loki });
      content = content.length ? content[0] : language;
      this.nav.push(ContentPage, { content });
    });
  }
}
