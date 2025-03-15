import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroments } from '../enviroments/enviroments';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private readonly _HttpClient=inject(HttpClient)
  constructor() { }

  getAllCategories():Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/categories`);
  }

  GetSpecificCategory(catId:string|null):Observable<any>{
    return this._HttpClient.get(`${enviroments.baseUrl}/api/v1/categories/${catId}`)
  }
}
