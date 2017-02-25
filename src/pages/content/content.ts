import { Component, ViewChild } from '@angular/core';
import { MenuController, NavParams, NavController } from 'ionic-angular';

import { DbProvider } from '../../providers/db';
import { Language } from '../../interfaces'

@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  content: Language;
  @ViewChild('contentEl') contentEl: any;

  constructor(public navParams: NavParams,
  public menu: MenuController,
  public db: DbProvider,
  public nav: NavController) {
    this.content = this.navParams.get('content') || {};
    if (!this.content.html) this.nav.pop();
  }

  ionViewDidEnter() {
    this.menu.enable(false);
    this.contentEl.scrollTo(0, this.content.scrolltop || 0, 500);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.saveScrollPosition();
  }

  toggleFavorite() {
    const favorite = !!!this.content.favorite;
    this.db.updateWhere(this.content.$loki, { favorite });
    this.content.favorite = favorite;
  }

  saveScrollPosition() {
    const scrolltop: number = this.contentEl.scrollTop;
    if ((this.content.scrolltop && Math.abs(scrolltop - this.content.scrolltop) || scrolltop) > 100) {
      this.db.updateWhere(this.content.$loki, { scrolltop });
    }
  }
}
