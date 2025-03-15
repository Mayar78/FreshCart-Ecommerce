import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [NgClass, ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent {
  loading: boolean = false;
  resText!: string;
  resetPasswordSub!: Subscription;
  constructor(
    private _FormBuildr: FormBuilder,
    private _AuthService: AuthService,
    private _Router:Router
    
  ) {}

  resetPasswordForm: FormGroup = this._FormBuildr.group({
    email: [null, [Validators.required, Validators.email]],
    newPassword: [null, [Validators.required, Validators.pattern(/^\w{6,}$/)]],
  });

  resetPassword(): void {
    if (this.resetPasswordForm.valid) {
      this.loading = true;
      this.resetPasswordSub = this._AuthService
        .resetPassword(this.resetPasswordForm.value)
        .subscribe({
          next: (res) => {
            this.loading = false;
            sessionStorage.setItem('token', res.token);
            this._AuthService.saveDecodedInfo();
            setInterval(() => {
              this._Router.navigate(['/login']);
            }, 2000);
          },
          error: (err) => {
            this.resText = err.error.message;
            this.loading = false;
          },
        });
    } else {
      this.resetPasswordForm.markAllAsTouched();
    }
  }

  ngOnDestroy(): void {
    this.resetPasswordSub?.unsubscribe();
  }
}
