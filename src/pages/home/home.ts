import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AssessmentPage } from '../assessment/assessment';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  assess(){
    this.navCtrl.push(AssessmentPage);
    console.log("Assess clicked!");
  }

}
