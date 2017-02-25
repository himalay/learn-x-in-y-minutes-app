import {Injectable} from '@angular/core';
import * as loki from 'lokijs';
import {Language} from '../interfaces';

@Injectable()
export class DbProvider {
  db : any;
  languages : any;

  constructor() {
    this.db = new loki('learnDb');
    this.languages = this.db.addCollection('languages');
    this.importAll();
  }

  insert(language : Language) {
    this.languages.insert(language);
    this.saveAll();
  }

  updateWhere($loki, content){
    this.languages.chain()
    .find({ $loki })
    .update(language => {
      language = Object.assign(language, content);
      this.saveAll();
    });
  }

  remove(language) {
    this.languages.remove(language.$loki);
    this.saveAll();
  }

  toArray(val) {
    return Array.from(val);
  }

  saveAll() {
    try {
      localStorage.setItem('learnDb', JSON.stringify(this.db));
    } catch(e) {
      // console.error(e);
   }
  }

  importAll() {
    let learnDb;
    try {
        learnDb = localStorage.getItem('learnDb');
    } catch(e) {
        console.error(e);
    }
    
    if (learnDb) {
      this.db.loadJSON(learnDb);
        this.languages = this.db.getCollection('languages');
    }
  }
}
