import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage} from '@ionic/storage';
import 'rxjs/add/operator/map';

let apiUrl = "https://api-python3f.herokuapp.com/"

@Injectable()
export class AuthProvider {
  public token:any;

  constructor(public http: Http, public storage: Storage) {

  }

  checkAuthentication(){
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((value) => {
        this.token = value;

        let headers = new Headers();
        headers.append('Authorization', this.token);

        this.http.get(apiUrl+'auth', {headers: headers})
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
      });
    });
  }

  createAccount(details){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(apiUrl+'register', JSON.stringify(details), {headers: headers})
      .subscribe(res => {

        let data = res.json();
        this.token = data.token;
        this.storage.set('token', data.token);
        resolve(data);

      }, (err) => {
        reject(err);
      });
    });
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');

      this.http.post(apiUrl+'auth', JSON.stringify(credentials), {headers:headers})
      .subscribe(res => {

        let data = res.json();
        this.token = data.token;
        this.storage.set('token', data.token);
        resolve(data);

        resolve(res.json());
      }, (err) => {
        reject(err);
      });
    });
  }

  logout(){
    this.storage.set('token', '');
  }
}
