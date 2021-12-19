import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  productList: any;
  status1: String = 'on the way';
  status2: String = 'delivered';
  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.getOrders().subscribe((res) => {
      this.productList = res;
      console.log(this.productList);
    });
  }

  statusUpdate(event: any) {
    console.log(event.target.getAttribute('value'));
    const id = event.target.getAttribute('id');
    const value = event.target.getAttribute('value');
    // console.log(data);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    let status = id == 1 ? 'on the way' : 'delivered';
    var raw = JSON.stringify({
      status: status,
    });

    var requestOptions = {
      method: 'PUT',
      headers: myHeaders,
      body: raw,
    };

    fetch(`http://localhost:4000/api/v1/orders/${value}`, requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log('error', error));
  }
}
