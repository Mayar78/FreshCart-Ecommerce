import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  decodedInfo:any;

  constructor(private _HttpClient:HttpClient) { }

  registerUser(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup',userData)
  }
  loginUser(userData:object):Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData)
  }

  saveDecodedInfo():void{
    if(sessionStorage.getItem('token') != null){
      this.decodedInfo = jwtDecode(sessionStorage.getItem('token') !)
    }
    console.log(this.decodedInfo);
    
  }
  resetPassword(userData: object): Observable<any> {
    return this._HttpClient.put(
      `${enviroments.baseUrl}/api/v1/auth/resetPassword`,
      userData
    );
}

forgetPassword(userEmail: object): Observable<any> {
  return this._HttpClient.post(
    `${enviroments.baseUrl}/api/v1/auth/forgotPasswords`,
    userEmail
  );
}

resetCode(resetCode: object): Observable<any> {
  return this._HttpClient.post(
    `${enviroments.baseUrl}/api/v1/auth/verifyResetCode`,
    resetCode
  );
}


}