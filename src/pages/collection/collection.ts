import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { MdProvider } from './../../providers/md';
import { InfoPage } from './../info/info';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  constructor(public nav: NavController, public http: Http, public md: MdProvider,) {
    
  }

  fetchReadMe() {
    return new Promise(resolve => {
      this.http.get('https://raw.githubusercontent.com/adambard/learnxinyminutes-docs/master/README.markdown').subscribe(res => {
        if ('_body' in res) {
          resolve(this.md.compileMarkdown(res['_body']));
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
}
