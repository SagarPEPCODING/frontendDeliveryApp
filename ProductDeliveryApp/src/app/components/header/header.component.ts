import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { LoginService } from 'src/app/service/login.service';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartItemsCount: number = 0;
  constructor(private cart: CartService, private loginService: LoginService) {
    console.log('sagar');
  }
  logined: boolean = this.loginService.logined;

  ngOnInit(): void {
    // this.logined = this.loginService.logined;
    console.log('header', this.loginService.logined);
    this.cart.getProducts().subscribe((res: any) => {
      this.cartItemsCount = res.length;
      console.log('this is count :- ', this.cartItemsCount);
    });
    this.loginService.getLogined().subscribe((res: any) => {
      console.log('this is my logine dservice ...');
      this.logined = res;
    });
  }

  setCartItems() {
    this.cartItemsCount = this.cart.noOfItems;
    console.log(this.cartItemsCount);
  }

  logoutClicked() {
    console.log('logout clicked');
    localStorage.removeItem('data');
  }
}
