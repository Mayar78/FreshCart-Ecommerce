import { enviroments } from './../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }
  clientToken:any = {token : sessionStorage.getItem('token')}


  payment(cartId:string|null, shippingData:object):Observable<any>{
    return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${enviroments.url}`,
     { "shippingAddress" : shippingData}, 
    
    )
  }
}
