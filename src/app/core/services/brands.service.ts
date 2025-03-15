import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HttpClient: HttpClient) {}

  getAllBrands(currentPage: number = 1): Observable<any> {
    return this._HttpClient.get(
      `${enviroments.baseUrl}/api/v1/brands?page=${currentPage}`
    );
  }

}
