import { Component, computed, HostListener, OnDestroy, OnInit, signal, Signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../core/services/cart.service';
import { Subscription } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-nav-main',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './nav-main.component.html',
  styleUrl: './nav-main.component.css'
})
export class NavMainComponent implements OnInit,OnDestroy {

  constructor(private _Router:Router, private _CartService : CartService){}
  totalCount!:number;
      totalCount2:Signal<number> = computed(()=> this._CartService.noOfItems2())
  

  SubId!:Subscription;

  ngAfterViewInit() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      document.body.style.paddingTop = navbar.offsetHeight + 'px';
    }
  }
  ngOnInit(): void {


    this._CartService.getLoogedUserCart().subscribe({
      next:(res)=>{
        this._CartService.noOfItems2.set(res.numOfCartItems);
      }
    })




  }
  countIncrease():void{
    this._CartService.noOfItems2.update( (val)=> val=val+1,
    
  )
    

  }
  isScrolling:boolean=false;
  @HostListener('window:scroll',[])
  onwindowscroll()
  {
    this.isScrolling=window.scrollY > 30;
  }


  signOut():void{
    sessionStorage.removeItem('token');
    this._Router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.SubId!.unsubscribe();
  }
}


