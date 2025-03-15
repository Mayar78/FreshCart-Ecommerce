import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { FormsModule, NgModel } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [SearchPipe, CurrencyPipe, RouterLink, FormsModule, ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit,OnDestroy{
constructor( private _ToastrService:ToastrService, private _ProductService:ProductService,  private _CartService: CartService, 
    private _WishlistService: WishlistService, ){}
  productsData!:IProduct[];
  Searchvalue:string = '';
    productSub!:Subscription;
   hasMatchingProducts: boolean = false;
    whishlistData!: Iwishlist[];
      whishlistIds!: string[];



ngOnInit(): void {
  this._ProductService.getAllProduct().subscribe({
    next:(res)=>{
      console.log(res.data)
      this.productsData = res.data
    },
    error:(error)=>{console.log(error)},
    complete:()=>{},
    
  })

  this._WishlistService.getWishlist().subscribe({
    next: (res) => {
      this.whishlistData = res.data;
      this.whishlistIds = this.whishlistData.map((item) => item._id);
    },
  });
}
addToCart(pId:string):void{
 this.productSub= this._CartService.addProductToCart(pId).subscribe({
    next:(res)=>{
      console.log(res);
    
       this._ToastrService.success(res.message, "Added to your cart");
    },

    error:(err)=>{
      this._ToastrService.error(err.message, "Unsuccessfully");

    }
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
ngOnDestroy(): void {
  this.productSub?.unsubscribe();
}

}
