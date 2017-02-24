import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { MdProvider } from '../../providers/md';
import { DbProvider } from '../../providers/db';
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
  public http: Http,
  public md: MdProvider,
  public db: DbProvider) {}

  ionViewWillEnter() {
    this.languages = this.db.languages.find({ favorite: true });
  }

  fetchReadMe() {
    return new Promise(resolve => {
      let readme = localStorage.getItem('readme');
      if (readme) return resolve(readme);
      this.http.get('https://raw.githubusercontent.com/adambard/learnxinyminutes-docs/master/README.markdown')
      .subscribe(res => {
        if ('_body' in res) {
          readme = this.md.compileMarkdown(res['_body']);
          localStorage.setItem('readme', readme);
          resolve(readme);
        }
      });
    });
  }

  openInfoPage() {
    this.fetchReadMe()
    .then((readme: string) => {
      this.nav.push(InfoPage, { readme });
    });
  }

  openContentpage(content) {
    this.nav.push(ContentPage, { content });
  }
}
