import { HttpClient } from '@angular/common/http';
import { computed, Injectable, OnInit, Signal, signal, WritableSignal } from '@angular/core';
import { enviroments } from '../enviroments/enviroments';
import { Token } from '@angular/compiler';
import { BehaviorSubject, Observable } from 'rxjs';
import { ICart } from '../interfaces/icart';

@Injectable({
  providedIn: 'root' 
})
export class CartService{
  constructor(private _HttpClient:HttpClient) { }

  // noOfItems: BehaviorSubject<number> = new BehaviorSubject(0);
  noOfItems2: WritableSignal<number> = signal(0);
    // totalCount:Signal<number> = computed(()=> this.noOfItems2)
  

  getLoogedUserCart():Observable<any> {
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/cart`)
  }

  addProductToCart(p_id:string):Observable<any>{
    return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/cart`, {'productId': p_id})
  }

  removeItemFormCart(p_id:string):Observable<any>{
   return this._HttpClient.delete(`${enviroments.baseUrl}/api/v1/cart/${p_id}`)
  }

  updateQuantity(p_id:string, countValue:number):Observable<any>{
    return this._HttpClient.put(`${enviroments.baseUrl}/api/v1/cart/${p_id}`,{"count": countValue});
  }
  clearCart():Observable<any>{
    return this._HttpClient.delete(`${enviroments.baseUrl}/api/v1/cart`)
  }
}

