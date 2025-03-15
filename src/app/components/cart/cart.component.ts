import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, NgClass , RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit,OnDestroy {
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);


  cartData:ICart | null = null;

  cartSub!:Subscription;

  clearAllCart():void{
    this._CartService.clearCart().subscribe({
      next:(res)=>{
        this.cartData = res.data;
       
        this._CartService.noOfItems2.set(0)
      }
    })
  }
  deleteItem(p_id:string):void{
    this._CartService.removeItemFormCart(p_id).subscribe({
      next:(res)=>{this.cartData= res.data;
      this._CartService.noOfItems2.update((value)=>value - 1)
      this._ToastrService.error(res.message, "Deleted Succussfully");
      console.log(res.data);
      },
      error:(err)=>{console.log(err);
      }
    })
  }

  Quantity(p_id:string, countValue:number):void{
    this._CartService.updateQuantity(p_id,countValue).subscribe({
      next:(res)=>{
        this.cartData = res.data;
        console.log(res);
      },
      error:(err)=>{console.log(err);
      },
    })
  }
  ngOnInit(): void {
    this.cartSub = this._CartService.getLoogedUserCart().subscribe({
      next:(res)=>{

        this.cartData= res.data;
        console.log(res);
      },
      error:(err)=>{console.log(err);
      },
    })

    
  }

  ngOnDestroy(): void {
    this.cartSub?.unsubscribe();
  }

}
