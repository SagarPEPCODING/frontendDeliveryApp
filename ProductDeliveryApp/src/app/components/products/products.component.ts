import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public mydata: any;
  constructor(private api: ApiService, private cart: CartService) {}

  ngOnInit(): void {
    this.api.getProducts().subscribe((res) => {
      this.productList = res;
      // console.log(this.productList);
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1, total: a.price });
      });
      this.mydata = this.productList;
    });
  }

  addtocart(item: any) {
    this.cart.addProductIntoCart(item);
    // this.headerComponent.setCartItems();
  }

  productClicked = (event: any) => {
    console.log(this.api.serviceProductList);
    const id = event.target.id;
    console.log(id);
    let array: any[] = [];

    if (id === 'electronics') {
      this.api.serviceProductList.map((obj: any) => {
        if (obj.category === 'electronics') {
          array.push(obj);
        }
      });
      this.productList = array;
    } else if (id === 'jewelery') {
      this.api.serviceProductList.map((obj: any) => {
        if (obj.category === 'jewelery') {
          array.push(obj);
        }
      });
      this.productList = array;
    } else if (id === 'fashion') {
      this.api.serviceProductList.map((obj: any) => {
        if (obj.category !== 'electronics' && obj.category !== 'jewelery') {
          array.push(obj);
        }
      });
      this.productList = array;
    } else {
      this.productList = this.api.serviceProductList;
    }
    console.log(this.mydata);
  };
}
