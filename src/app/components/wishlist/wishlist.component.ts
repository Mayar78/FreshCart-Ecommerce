import { Component } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {
  constructor(private _WishlistService:WishlistService, private _ToastrService: ToastrService,
    private _CarteService: CartService){}

    wishlistData!:any;
    whishlistIds!: string[];


    removeFormWishlist(pID:string){
      this._WishlistService.removeItemFromWishlist(pID).subscribe({
        next:(res)=>{
          this._ToastrService.success(res.message, "deleted successfully")
          this.wishlistData= res.data
        }
      })
    }


    addcart(pID:string){
      this._CarteService.addProductToCart(pID).subscribe({
        next: (res) => {
        // this._CartService.noOfItems2.update( (value)=> value = res.numOfCartItems)
        this._CarteService.noOfItems2.update((value)=> value = res.numOfCartItems)

          this._ToastrService.success(res.message, 'Success');}
      })
    }

    ngOnInit(): void {
      this._WishlistService.getWishlist().subscribe({
        next: (res) => {
          this.wishlistData = res.data;
        },
      });
    }
}


