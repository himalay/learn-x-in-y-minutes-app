import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Http } from '@angular/http';
import { LoadingController } from 'ionic-angular';

import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';
import { Language } from '../interfaces';
import { MdProvider } from '../providers/md';
import { DbProvider } from '../providers/db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionPage;

  languages: Array<Language>;
  temp: any;

  constructor(public platform: Platform,
  public http: Http,
  public md: MdProvider,
  public loadingCtrl: LoadingController,
  public db: DbProvider) {
    this.initializeApp();
    
    this.fetchLanguages()
    .then(() => {
        this.temp = this.db.toArray(this.db.languages.data);
        this.setLanguages();
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

  filterItems(ev) {
    this.setLanguages();
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      this.languages = this.languages.filter(({title}) => title.toLowerCase().includes(val.toLowerCase()));
    }
  }

  presentLoading() {
    this.loadingCtrl.create({
      cssClass: 'spinner-wrapper',
      dismissOnPageChange: true,
      duration: 5000
    }).present();
  }

  fetchLanguages() {
    return new Promise(resolve => {
      if (this.db.languages.data && this.db.languages.data.length) return resolve();
      this.http.get('https://api.github.com/repos/adambard/learnxinyminutes-docs/contents/')
      .subscribe(res => {
        res.json()
        .map(({name, download_url}) => {
          if (/html\.markdown$/.test(name)) {
            this.db.insert({
              title: name.replace('.html.markdown', '').replace('-', ' '),
              url: download_url
            });
          }
        });
        resolve();
      });
    })
  }

  fetchContent(language: Language) {
    return new Promise(resolve => {
      this.presentLoading();

      if (language.html) return resolve();

      this.http.get(language.url).subscribe(res => {
        if ('_body' in res) {
          this.db.updateWhere(language.$loki, Object.assign(language, this.md.parse(res['_body'])));
          resolve();
        }
      });
    })
  }

  openContentPage(language: Language) {
    this.fetchContent(language)
    .then(() => {
      let content = this.db.languages.find({ $loki: language.$loki });
      content = content.length ? content[0] : language;
      this.nav.push(ContentPage, { content });
    });
  }
}
