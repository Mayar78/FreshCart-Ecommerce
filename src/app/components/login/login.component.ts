import { Router, RouterLink } from '@angular/router';
import { AuthService } from './../../core/services/auth.service';
import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy{

  loading: boolean = false;
  responseMssg!: string;
  errorOrSuccess!:String;
  loginSub!:Subscription;
  intervalId!:any;
  constructor(private _FormBuilder: FormBuilder, private _AuthService: AuthService,private _Router:Router) { }

  loginForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })

  loginUser(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      console.log(this.loginForm);
     this.loginSub= this._AuthService.loginUser(this.loginForm.value).subscribe({
        next: (res) => {
          sessionStorage.setItem('token', res.token);
          this._AuthService.saveDecodedInfo();
          this.responseMssg = res.message;
          this.errorOrSuccess='success';
          this.loading = false;
          this.intervalId= setInterval( ()=> {
            this._Router.navigate(['/home'])
          }, 2000)

        },
        error:(error)=>{
          this.errorOrSuccess='error';
          this.responseMssg= error.error.message;
          this.loading=false;
        }

      })
    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }

ngOnDestroy(): void {
  this.loginSub?.unsubscribe();
  this.intervalId?.clear();
}
}
