import { Component } from '@angular/core';
import { NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  readme: string;

  constructor(public navParams: NavParams, public menu: MenuController) {
    this.readme = navParams.get('readme');
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log(this.readme);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

}
