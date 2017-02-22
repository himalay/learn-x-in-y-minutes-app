import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { Language } from '../../interfaces';

@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  language: Language;
  content: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.language = navParams.get('language');
    this.fetchContent(this.language.url);
  }

  ionViewDidLoad() {
    console.log(this.language);
  }

  fetchContent(url: string) {
    this.http.get(url).subscribe(res => {
        if ('_body' in res) {
          this.content = res['_body'];
        }
      });
  }
}
