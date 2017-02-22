import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { CollectionPage } from '../pages/collection/collection';
import { ContentPage } from '../pages/content/content';

interface Language { id?: number, name: string, title: string, url: string };

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = CollectionPage;

  languages: Array<Language>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.setLanguages();

  }

  setLanguages () {
    let languages: Array<Language> = [];
    let i = 20;
    
    while(i--) {
      languages.push({
        id: i,
        title: `Language ${i}`,
        name: `Language ${i}`,
        url: '#'
      });
    }

    this.languages = languages;
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

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(ContentPage);
  }
}
