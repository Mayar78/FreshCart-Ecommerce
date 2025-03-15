import { SearchPipe } from './../../core/pipes/search.pipe';

import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategories } from '../../core/interfaces/icategories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule,RouterLink, CurrencyPipe,FormsModule, SearchPipe, ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy{
  productSub!:Subscription;
  categorySub!:Subscription;
  productsData!:IProduct[];
  categoriesData!:ICategories[];
  Searchvalue:string = '';
  cartItems!:number;
  whishlistData!: Iwishlist[];
  whishlistIds!: string[];

  catSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      500: {
        items: 3
      },
      740: {
        items: 4
      },
      940: {
        items: 5
      },
      1100: {
        items: 6
      }
    },
   
  }
  mainSlider: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    autoplay: true,
    autoplayTimeout: 2000,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
  items:1,
   
  }

  constructor(private _ProductService:ProductService, private _CategoriesService : CategoriesService , private _CartService:CartService, private _ToastrService:ToastrService
   , private _WishlistService:WishlistService
  ){}

  addToCart(pId:string):void{
    this._CartService.addProductToCart(pId).subscribe({
      next:(res)=>{
         console.log(res);
      
        this._CartService.noOfItems2.update( (value)=> value = res.numOfCartItems)
         this._ToastrService.success(res.message, "Added to your cart")
      },
      error:(err)=>{console.log(err);
        this._ToastrService.error(err.message, "Unsuccessfully")

      },
    })
  }
  addToWishlist(p_id: string) {
    this._WishlistService.addProductToWishlist(p_id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Success');
        this.whishlistIds = res.data;
      },
    })
  }
  removeFromWishlist(p_id: string) {
    this._WishlistService.removeItemFromWishlist(p_id).subscribe({
      next: (res) => {
        this._ToastrService.success(res.message, 'Success');
        this.whishlistIds = res.data;
      },
    });
  }

  isProductInWishlist(productId: string): boolean {
    return this.whishlistIds.includes(productId);}


  ngOnInit(): void {
    this.productSub = this._ProductService.getAllProduct().subscribe({
      next:(res)=>{
        console.log(res.data.slice(0,20));
        this.productsData = res.data.slice(0,20);
      },
      error:(error)=>{console.log(error)},
      complete:()=>{},

    })

    this.categorySub=this._CategoriesService.getAllCategories().subscribe({
      next:(res)=>{
        console.log(res.data);
        this.categoriesData=res.data;
      },
      error:(error)=>{console.log(error)},
      complete:()=>{

      },

    })

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.whishlistData = res.data;
        this.whishlistIds = this.whishlistData.map((item) => item._id);
      },
    });
  }

  ngOnDestroy(): void {
    this.productSub?.unsubscribe();
    this.categorySub?.unsubscribe();
  }

}
