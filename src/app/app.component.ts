import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';

import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';
import { Language } from '../interfaces';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionPage;

  languages: Array<Language>;
  temp: Array<Language>;

  constructor(public platform: Platform, public http: Http) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.fetchLanguages();

  }

  setLanguages () {
    this.languages = this.temp;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  filterItems(ev) {
    this.setLanguages();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.languages = this.languages.filter(({title}) => title.toLowerCase().includes(val.toLowerCase()));
    }
  }

  fetchLanguages() {
    this.http.get('https://api.github.com/repos/adambard/learnxinyminutes-docs/contents/')
    .subscribe(res => {
      let languages: Array<Language> = [];
      res.json()
      .map(({name, download_url}) => {
        if (/html\.markdown$/.test(name)) {
          languages.push({
            title: name.replace('.html.markdown', '').replace('-', ' '),
            name,
            url: download_url
          });
        }
      });

      this.temp = languages;
      this.setLanguages();
    });
  }

  openContentPage(language: Language) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(ContentPage, { language });
  }
}
