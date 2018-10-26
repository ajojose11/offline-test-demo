import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { QueServiceProvider } from '../../providers/que-service/que-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private network: Network, private que: QueServiceProvider) {
   
  }

  ngOnInit () {
    this.que.getEmployee().subscribe(val => {
      console.log('employee object received' + JSON.stringify(val));
    })
  }

  

}
