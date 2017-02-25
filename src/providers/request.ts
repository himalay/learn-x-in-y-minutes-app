import { Injectable } from '@angular/core';
import { LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { DbProvider } from '../providers/db';
import { MdProvider } from '../providers/md';
import { Language } from '../interfaces';

const LANGUAGES = 'https://api.github.com/repos/adambard/learnxinyminutes-docs/contents/';
const README = 'https://raw.githubusercontent.com/adambard/learnxinyminutes-docs/master/README.markdown';

@Injectable()
export class RequestProvider {
  isOnline$: Observable<boolean>;

  constructor(public http: Http,
  public loadingCtrl: LoadingController,
  public alertCtrl: AlertController,
  public db: DbProvider,
  public md: MdProvider) {
    this.isOnline$ = Observable.merge(
      Observable.of(navigator.onLine),
      Observable.fromEvent(window, 'online').map(() => true),
      Observable.fromEvent(window, 'offline').map(() => false))
  }

  presentLoading() {
    this.loadingCtrl.create({
      cssClass: 'spinner-wrapper',
      dismissOnPageChange: true,
      duration: 5000
    }).present();
  }

  presentAlert() {
    const exp = ['D\'Oh!', 'Ouch!', 'Uh oh!', 'Dag-nab-it!'];
    this.alertCtrl.create({
      title: exp[Math.floor(Math.random() * exp.length)],
      subTitle: 'Unable to connect to the server.',
      buttons: ['OK']
    }).present();
  }

  fetchLanguages() {
    return new Promise(resolve => {
      if (this.db.languages.data && this.db.languages.data.length) return resolve();
      this.http.get(LANGUAGES)
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
      },
      err => {
        console.error('[fetchLanguages]', err);
      });
    });
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
      },
      err => {
        console.error('[fetchContent]', err);
      });
    });
  }

  fetchReadMe() {
    return new Promise(resolve => {
      let readme = localStorage.getItem('readme');
      if (readme) return resolve(readme);

      this.presentLoading();

      this.http.get(README)
      .subscribe(res => {
        const find = 'href="/CONTRIBUTING.markdown"';
        const replace = 'href="https://github.com/adambard/learnxinyminutes-docs/blob/master/CONTRIBUTING.markdown"';
        readme = this.md.compileMarkdown(res['_body']).replace(find, replace);
        localStorage.setItem('readme', readme);
        resolve(readme);
      },
      err => {
        console.error('[fetchReadMe]', err);
      });
    });
  }
}
