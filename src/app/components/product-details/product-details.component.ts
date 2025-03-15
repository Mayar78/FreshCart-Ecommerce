import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CurrencyPipe } from '@angular/common';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Iwishlist } from '../../core/interfaces/iwishlist';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule , CurrencyPipe],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnInit{
  detailsSlider: OwlOptions = {
    autoplay:true,
    autoplayTimeout:1000,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false,
  }
  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService, private _CartService:CartService, private _ToastrService:ToastrService,    private _WishlistService: WishlistService, 
  ){}
  productId!:string|null;
  detailsData:IProduct | null = null;
  whishlistData!: Iwishlist[];
    whishlistIds!: string[];

  addCart(id:string):void{
    this._CartService.addProductToCart(id).subscribe({
      next:(res)=>{
        this._ToastrService.success(res.message, 'Success')
        console.log(res);
     },
     error:(err)=>{console.log(err);
     },
    })
  }
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next:(pInfo)=>{console.log(pInfo.get('PId'));
      this.productId=pInfo.get('PId')
      }
    })

    this._WishlistService.getWishlist().subscribe({
      next: (res) => {
        this.whishlistData = res.data;
        this.whishlistIds = this.whishlistData.map((item) => item._id);
      },
    });
    this._ProductService.getProductDetails(this.productId).subscribe({
      next:(res)=>{console.log(res.data);
      this.detailsData = res.data;
      },
      error:(err)=>{console.log(err);
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

}
