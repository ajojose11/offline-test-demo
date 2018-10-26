import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { QueServiceProvider } from '../../providers/que-service/que-service';
import { HomePage } from '../home/home'
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string = 'corporate';
  password: string = 'cmnr1234';
  constructor(public navCtrl: NavController, public navParams: NavParams, private que: QueServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    console.log('Login Clicked');
    this.que.login({username:this.username,password:this.password}).subscribe(res => {
      console.log(res.data);
      if (res.success) {

        this.que.tokensave(res.data.token)
        this.navCtrl.push(HomePage);

      }
    },
    error => {
      console.log(error);
    })
  }

}
