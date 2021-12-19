import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  ourform = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  logined: boolean = false;
  constructor(private router: Router, private loginService: LoginService) {}

  ngOnInit(): void {}

  submit(event: any) {
    event.preventDefault();
    console.log(this.ourform.value);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(this.ourform.value),
      // redirect: 'follow',
    };
    console.log(requestOptions);
    fetch('http://localhost:4000/api/v1/users/login', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        if (result.login) {
          this.logined = true;
          console.log('previous', this.loginService.logined);
          this.loginService.changeLogined(true);
          console.log('then', this.loginService.logined);
          this.loginService.loginedData = result;
          localStorage.setItem('data', JSON.stringify(result));
          this.router.navigate(['']);
        } else {
          alert('enter right password and email');
        }
      })
      .catch((error) => console.log('error', error));

    console.log('submition done');
  }
}
