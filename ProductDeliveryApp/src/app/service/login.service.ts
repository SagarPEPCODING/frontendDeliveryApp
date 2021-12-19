import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  logined: boolean = false;
  public userlogined = new BehaviorSubject<boolean>(false);
  loginedData: any;
  constructor() {}
  changeLogined(data: boolean) {
    this.logined = data;
    this.userlogined.next(data);
  }

  getLogined() {
    return this.userlogined.asObservable();
  }
}
