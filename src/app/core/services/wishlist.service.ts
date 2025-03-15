import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }

  getWishlist():Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/wishlist`)
  }

  addProductToWishlist(pId:string):Observable<any>{
    return this._HttpClient.post(`${enviroments.baseUrl}/api/v1/wishlist`, {productId : pId});
  }


  removeItemFromWishlist(pId:string):Observable<any>{
    return this._HttpClient.delete(`${enviroments.baseUrl}/api/v1/wishlist/${pId}`)
  }

}


