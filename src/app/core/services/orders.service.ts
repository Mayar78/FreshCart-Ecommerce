import { enviroments } from './../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private _HttpClient:HttpClient, private _AuthService:AuthService) { }
  decodedInfo!: any;
  saveDecodedUser(): void {
    if (sessionStorage.getItem('token') != null) {
      this.decodedInfo = jwtDecode(sessionStorage.getItem('token')!);
    }
  }

  getUserOrders():Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/orders/user/${this.decodedInfo.id}`)
  }
}
