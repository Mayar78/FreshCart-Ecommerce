import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-basedonproduct',
  standalone: true,
  imports: [SearchPipe, CurrencyPipe, FormsModule, RouterLink],
  templateUrl: './basedonproduct.component.html',
  styleUrls: ['./basedonproduct.component.css']
})
export class BasedonproductComponent implements OnInit {

  productsData: IProduct[] = [];  
  Searchvalue: string = '';
  catName: string | null = null;
  hasMatchingProducts: boolean = false;
  whishlistData!: Iwishlist[];
    whishlistIds!: string[];

  constructor(
    private _ProductService: ProductService, 
    private _ToastrService: ToastrService, 
    private _CartService: CartService, 
    private _WishlistService: WishlistService, 
    private _ActivatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.catName = params.get('CName'); 
        this.filterProducts(); 
      }

      
    });

    this._WishlistService.getWishlist().subscribe({
        next: (res) => {
          this.whishlistData = res.data;
          this.whishlistIds = this.whishlistData.map((item) => item._id);
        },
      });

    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        this.productsData = res.data;
        this.filterProducts(); 
      },
      error: (err) => console.error(err)
    });
  }

  isMatchingCategory(product: IProduct): boolean {
    if (!this.catName) return false;
    return product.category.name.trim().toLowerCase() === this.catName.trim().toLowerCase();
  }

  filterProducts(): void {
    this.hasMatchingProducts = this.productsData.some(product => this.isMatchingCategory(product));
  }

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

}
