import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';

import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';
import { Language } from '../interfaces';
import { MdProvider } from '../providers/md';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionPage;

  languages: Array<Language>;
  temp: Array<Language>;

  constructor(public platform: Platform, public http: Http, public md: MdProvider) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.fetchLanguages()
    .then(languages => {
        this.temp = languages;
        this.setLanguages();
    });
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
    return new Promise (resolve => {
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

        resolve(languages);
      });
    })
  }

  fetchContent(language: Language) {
    return new Promise(resolve => {
      this.http.get(language.url).subscribe(res => {
        if ('_body' in res) {
          const content = Object.assign({}, this.md.parse(res['_body']), language)
          resolve(content)
        }
      });
    })
  }

  openContentPage(language: Language) {
    this.fetchContent(language)
    .then(content => {
      this.nav.push(ContentPage, { content });
    });
  }
}
