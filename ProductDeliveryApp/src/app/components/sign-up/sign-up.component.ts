import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  ourform = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private router: Router) {}

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

    fetch('http://localhost:4000/api/v1/users/', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.router.navigate(['login']);
      })
      .catch((error) => console.log('error', error));

    console.log('submition done');
  }
}
