import { PaymentService } from './../../core/services/payment.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { log } from 'console';

@Component({
  selector: 'app-chackout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chackout.component.html',
  styleUrl: './chackout.component.css'
})
export class ChackoutComponent implements OnInit{
  cartID!:string | null; 
 private readonly _FormBuilder=inject(FormBuilder);
 private readonly _ActivatedRoute=inject(ActivatedRoute);
 private readonly _PaymentService=inject(PaymentService);


 

 shippingAddress:FormGroup = this._FormBuilder.group({
  details:[null,Validators.required],
  phone:[null,Validators.required], 
  city:[null , Validators.required]

 })

 payOrder():void{
  console.log(this.shippingAddress.value);
  this._PaymentService.payment(this.cartID , this.shippingAddress.value).subscribe({
    next:(res)=>{console.log(res);
      window.open(res.session.url, "_self")
    }
  })

  
 }
 
 ngOnInit(): void {
   this._ActivatedRoute.paramMap.subscribe({
    next:(param)=>{
     this.cartID= param.get('cartId')
    }
   })
 }
}
