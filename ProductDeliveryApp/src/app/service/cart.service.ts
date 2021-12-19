import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public noOfItems: number = 0;
  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]);
  public grandTotal: number = 0;
  constructor() {}
  addProductIntoCart(item: any) {
    let alreadyExist: boolean = false;
    this.cartItemList.map((myitem: any) => {
      if (myitem.id === item.id) {
        alreadyExist = true;
      }
    });
    if (!alreadyExist) {
      this.cartItemList.push(item);
      this.productList.next(this.cartItemList);
      this.noOfItems += 1;
      this.grandTotal += item.total;
    }
  }
  getNoOfItems(): number {
    return this.noOfItems;
  }

  getProducts() {
    return this.productList.asObservable();
  }

  removeProduct(item: any, index: number) {
    console.log(index, item);
    this.cartItemList.splice(index, 1);
    this.productList.next(this.cartItemList);
    this.grandTotal = this.grandTotal - item.total;
  }

  clearAllProducts() {
    console.log('remove all products');
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }

  getGrandTOtal(): number {
    return this.grandTotal;
  }

  emptyCart() {
    this.cartItemList = [];
    this.productList = new BehaviorSubject<any>([]);
  }
}
