
  import { Component } from '@angular/core';
  import {
    FormBuilder,
    FormGroup,
    ReactiveFormsModule,
    Validators,
  } from '@angular/forms';
  import { Subscription } from 'rxjs';
  import { AuthService } from '../../core/services/auth.service';
  import { Router } from '@angular/router';
  import { NgClass } from '@angular/common';
  
  @Component({
    selector: 'app-reset-code',
    standalone: true,
    imports: [ReactiveFormsModule, NgClass],
    templateUrl: './reset-code.component.html',
    styleUrl: './reset-code.component.css',
  })
  export class ResetCodeComponent {
    errorMsg!: string;
    loading: boolean = false;
    resetCodeSub!: Subscription;
    constructor(
      private _FormBuildr: FormBuilder,
      private _AuthService: AuthService,
      private _Router: Router
    ) {}
  
    resetCodeForm: FormGroup = this._FormBuildr.group({
      resetCode: [null, [Validators.required, Validators.pattern(/^\d{6}$/)]],
    });
  
    resetCode(): void {
      if (this.resetCodeForm.valid) {
        this.loading = true;
        this.resetCodeSub = this._AuthService
          .resetCode(this.resetCodeForm.value)
          .subscribe({
            next: (res) => {
              this.loading = false;
              console.log(res);
              setInterval(() => {
                this._Router.navigate(['/reset-password']);
              }, 2000);
            },
            error: (err) => {
              this.loading = false;
              this.errorMsg = err.error.message;
            },
          });
      } else {
        this.resetCodeForm.markAllAsTouched();
      }
    }
  
    ngOnDestroy(): void {
      this.resetCodeSub?.unsubscribe();
    }
  }

