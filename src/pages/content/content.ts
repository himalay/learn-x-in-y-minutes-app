import { Component, ViewChild } from '@angular/core';
import { MenuController, NavParams } from 'ionic-angular';
import { Language } from '../../interfaces'

@Component({
  selector: 'page-content',
  templateUrl: 'content.html'
})
export class ContentPage {
  content: Language;
  @ViewChild('contentEl') contentEl: any;

  constructor(public navParams: NavParams, public menu: MenuController) {
    this.content = navParams.get('content');
  }

  ionViewDidEnter() {
    this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log(this.content);
  }

  ionViewWillLeave() {
    this.menu.enable(true);
    this.saveScrollPosition();
  }

  saveScrollPosition() {
    const scrolltop: number = this.contentEl.scrollTop;
    if ((this.content.scrolltop && Math.abs(scrolltop - this.content.scrolltop) || scrolltop) > 100) {
      console.log(scrolltop);
    }
  }
}
