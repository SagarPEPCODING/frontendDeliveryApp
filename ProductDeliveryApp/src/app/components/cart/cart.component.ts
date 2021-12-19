import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';
import { AuthService } from 'src/app/service/auth.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  products: any[] = [];
  grandTotal: number = 0;
  constructor(private cart: CartService, private auth: AuthService) {}
  name: string = 'Sagar Sharma';
  orderid = '';
  rzp1: any;
  data: any;

  ngOnInit(): void {
    this.grandTotal = this.cart.getGrandTOtal();
    this.cart.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  options = {
    key: 'rzp_test_LpFwarhP3CCF7K', // Enter the Key ID generated from the Dashboard
    amount: this.grandTotal, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Mobile Programming',
    description: 'Test Transaction',
    image:
      'https://www.dailyexcelsior.com/wp-content/uploads/2020/10/13-10.jpg',
    order_id: '', //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    handler: function (response: {
      razorpay_payment_id: any;
      razorpay_order_id: any;
      razorpay_signature: any;
    }) {
      // alert(response.razorpay_payment_id);
      // alert(response.razorpay_order_id);
      // alert(response.razorpay_signature);
      console.log(response);
    },
    prefill: {
      name: this.name,
      email: 'raaasamrahs12345@gmail.com',
      contact: '9354860982',
    },
    notes: {
      address: 'Razorpay Corporate Office',
    },
    theme: {
      color: '#3399cc',
    },
  };

  removeItem(item: any, index: number) {
    this.cart.removeProduct(item, index);
    this.getGrandTotal();
  }

  clearAllItems() {
    this.cart.clearAllProducts();
  }

  getGrandTotal() {
    this.grandTotal = this.cart.getGrandTOtal();
  }

  checkOutButtonClicked() {
    console.log(this.grandTotal);
    console.log(this.products);
    this.options.amount = this.grandTotal * 100;
    console.log(this.options);
    this.rzp1 = new this.auth.nativeWindow.Razorpay(this.options);
    this.rzp1.order_id = '1234';
    this.rzp1.open();

    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var userdata: any = localStorage.getItem('data');
    if (userdata) {
      this.data = JSON.parse(userdata);
    }
    console.log(userdata);

    this.products.map((product) => {
      var raw = JSON.stringify({
        product: product.id,
        noOfItems: 2,
        totalPrice: 0,
        phone: '9354860982',
        country: 'India',
        city: 'Delhi',
        zip: '110041',
        shippingAddress: 'i-90, shiv ram park',
        user: this.data.user.id,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
      };

      fetch('http://localhost:4000/api/v1/orders/', requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.log('error', error));
    });

    this.cart.emptyCart();
    console.log(this.cart.cartItemList);
    this.ngOnInit();
  }
}
