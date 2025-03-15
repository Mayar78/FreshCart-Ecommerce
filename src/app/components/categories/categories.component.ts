import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../core/services/categories.service';
import { Subscription } from 'rxjs';
import { ICategories } from '../../core/interfaces/icategories';
import {  Router, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { BasedonproductComponent } from '../basedonproduct/basedonproduct.component';
// import { BasedonproductComponent } from '../basedonproduct/basedonproduct.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [RouterLink, ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit{
  categSub!:Subscription;
  categData!:ICategories[];
  
    catName!:string;
  

  constructor(private _CategoriesService:CategoriesService ){}
 
  ngOnInit(): void {
    this.categSub= this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categData= res.data;
     
       
        
      }
    })
  }

 

  

}
