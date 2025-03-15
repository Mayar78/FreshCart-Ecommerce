import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private _HttpClient:HttpClient) { }

  getAllProduct():Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/products`);
  }

  getProductDetails(id:string|null):Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/products/${id}`)
  }
}
