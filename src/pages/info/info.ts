import { Component } from '@angular/core';
import { NavParams, MenuController, NavController } from 'ionic-angular';

@Component({
  selector: 'page-info',
  templateUrl: 'info.html'
})
export class InfoPage {
  readme: string;

  constructor(public navParams: NavParams,
  public menu: MenuController,
  public nav: NavController) {
    this.readme = this.navParams.get('readme') || localStorage.getItem('readme');
    if (!this.readme) this.nav.pop();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
  }

}
