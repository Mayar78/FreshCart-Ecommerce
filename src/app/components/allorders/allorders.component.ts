import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { IOrders } from '../../core/interfaces/iorders';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.css'
})
export class AllordersComponent {

  constructor(private _OrdersService:OrdersService){}
  ordersData!:IOrders[];


  ngOnInit(): void {
    this._OrdersService.getUserOrders().subscribe({
      next: (res) => {
        this.ordersData = res.sort((a: IOrders, b: IOrders) => {
          const dateA = new Date(a.createdAt).getTime();
          const dateB = new Date(b.createdAt).getTime();
          return dateB - dateA; // Descending order
        });
      },
      error: (err) => console.log(err),
    });
  }

}
