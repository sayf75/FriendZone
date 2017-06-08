import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

let apiUrl = "https://api-python3f.herokuapp.com/register";

@Injectable()
export class LoginProvider {

  constructor(public http: Http) {}

  login() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 3000);

    });
  }
}
