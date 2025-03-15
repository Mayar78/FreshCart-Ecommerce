import { CatDetailsComponent } from './components/cat-details/cat-details.component';
import { ChackoutComponent } from './components/chackout/chackout.component';
import { Routes } from '@angular/router';
import { AuthComponent } from './layouts/auth/auth.component';
import { MainComponent } from './layouts/main/main.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { ResetCodeComponent } from './components/reset-code/reset-code.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { BasedonproductComponent } from './components/basedonproduct/basedonproduct.component';


export const routes: Routes = [
    
    {path:'', component:AuthComponent, children:[
        {path:'', redirectTo:'login',pathMatch:"full"},
        {path:'login', component:LoginComponent, title:'login'},
        {path:'register', component:RegisterComponent, title:'register'},
        {path:'forgetPassword', component:ForgetPasswordComponent, title:'forgetPassword'},
        {path:'reset-code', component:ResetCodeComponent, title:'reset code'},
        {path:'reset-password', component:ResetPasswordComponent, title:'reset Password'},



        
    ]},
    {path:'', component:MainComponent, canActivate:[authGuard], children:[
            {path:'', redirectTo:'home',pathMatch:"full"},
            {path:'home', component:HomeComponent,title:'Home'},
            {path:'products', component:ProductsComponent, title:'Products'},
            {path:'cart', component:CartComponent, title:'Cart'},
            {path:'orders', component:AllordersComponent, title:'All Orders'},
            {path:'brands', component:BrandsComponent, title:'Brands'},
            {path:'wishlist', component:WishlistComponent, title:'Wishlist'},
            {path:'categories', component:CategoriesComponent, title:'Categories'},
            {path:'categoryDetails/:catId', component:CatDetailsComponent, title:'category details'},  
            {path:'productdetails/:PId', component:ProductDetailsComponent, title:'product details'},  
            {path:'Based on product/:CName', component:BasedonproductComponent, title:'based on category'},  

            {path:'checkout/:cartId', component:ChackoutComponent, title:'checkout'},
    ]},
    {path:'**', component:NotFoundComponent, title:'Not Found'}
];
