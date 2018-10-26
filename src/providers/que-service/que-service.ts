
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Network } from '@ionic-native/network';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/observable/throw';


/*
  Generated class for the QueServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class QueServiceProvider {

  url: string = 'http://192.168.20.23:3000';

  constructor(private storage: Storage, private http: HttpClient, private network: Network) {
    console.log('Hello QueServiceProvider Provider');
    

  }

  getEmployee () {
    return this.http.get(this.url+'/api/list/employee').flatMap(res => {
      if (res.success) {
        console.log('employee fetch success');
        this.listSave('employee', res.data);
        let data = res.data;
        return data;
      } else {
        console.log('employee fetch not success');
        return fromPromise(this.listGet('employee')).map(val => {
          console.log('inside get employee  ' + JSON.stringify(val) );
          return val
        });
      }
    })
    .catch(this.errorHandler);
  }

  tokensave (data) {
    this.storage.set('token', data).then((val) => {
    });
    }
  tokenGet () : any {
    return this.storage.get('token').then((val) => {
      console.log('Your age is', val);
      return val;
    });
  }

  listSave (listName, data) {
    this.storage.set('list_'+listName, data ).then(val => {
      console.log(listName + 'list saved  ' +JSON.stringify(data));
    })
  }
  
  listGet (listName) {
    return this.storage.get('list_'+listName).then(val => {
      if(val) {
        console.log(listName + 'list fetched   ' + JSON.stringify(val) );

        return val
      }
      else return false
    })
  }

  login(data) {
    console.log('inside login',this.network.type);
    return this.http.post(this.url+ '/login',data)
    .catch(this.errorHandler);
  }

  errorHandler (error: HttpErrorResponse) {
    return Observable.throw(error.message);
  }
}
