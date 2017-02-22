import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { InfoPage } from './../info/info';

@Component({
  selector: 'page-collection',
  templateUrl: 'collection.html'
})
export class CollectionPage {

  constructor(public navCtrl: NavController) {
    
  }

  openPage(page) {
      // Reset the content nav to have just this page
      // we wouldn't want the back button to show in this scenario
      this.navCtrl.push(InfoPage);
  }
}
