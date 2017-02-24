import { Component } from '@angular/core';
import { NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  readme: string;

  constructor(public navParams: NavParams, public menu: MenuController) {}

  ionViewWillEnter() {
    this.readme = this.navParams.get('readme');
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

}
