import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';

import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {

  loading:boolean= false;
  responseMssg!:String;
  errorOrSuccess!:String;
  registerSub!:Subscription;
  intervalId!:any;


  constructor(private _AuthService:AuthService,private _Router:Router){}

  registerForm : FormGroup = new FormGroup({
    name:new FormControl (null, [Validators.required , Validators.minLength(3) , Validators.maxLength(10)]),
    email:new FormControl (null, [Validators.required , Validators.email]),
    password:new FormControl (null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    rePassword:new FormControl (null , [Validators.required , Validators.pattern(/^\w{6,}$/)]),
    phone:new FormControl (null , [Validators.required , Validators.pattern(/^01[0125][0-9]{8}$/)]),
  } , this.confirmPassword )
  
  confirmPassword( g:AbstractControl):(null | object){
    if( g.get('password')?.value === g.get('rePassword')?.value){
      return null;
    }
    else{ 
      return {missMatch: true};
    }
  }

  submitt():void{
    if(this.registerForm.valid){
      this.loading=true;
      console.log(this.registerForm);
      this.registerSub= this._AuthService.registerUser(this.registerForm.value).subscribe({
        next:(response)=>{console.log(response)
          this.responseMssg=response.message;
          this.loading=false;
          this.errorOrSuccess='success';
          this.intervalId=setInterval( ()=>
          {
            this._Router.navigate(['/login'])
          },2000)
        },
        error:(error)=>{
          console.log(error);
        this.responseMssg=error.error.message;
        this.loading=false;
        this.errorOrSuccess='error';

      },
        complete:()=> {}

      })
    }
    else{
      this.registerForm.setErrors({'missMatch':true});
      this.registerForm.markAllAsTouched();
    }
    
  }

  ngOnDestroy(): void {
    this.registerSub?.unsubscribe();
    this.intervalId?.clear();

  }

}




