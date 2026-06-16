import { MatButton } from '@angular/material/button';
import { Component, inject, signal } from '@angular/core';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompareSignUpPasswords } from '@shared/directives/compare-sign-up-passwords.directive';
import { SignInData } from '@core/models/auth.model';
import { AuthService } from '@core/services/auth.service';
import { Router } from '@angular/router';

interface SignInGroup {
  email: FormControl<string>;
  password: FormControl<string>;
}

interface SignUpGroup {
  nickname: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

@Component({
  selector: 'hive-sign-page',
  imports: [MatFormField, MatLabel, MatInput, ReactiveFormsModule, MatError, MatButton],
  templateUrl: './sign-page.html',
  styleUrl: './sign-page.scss',
})
export class SignPage {
  readonly movePanel = signal<string>('');
  readonly isSignInPanel = signal(true);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  public readonly errorMessage = signal<string | null>(null);

  signInForm = new FormGroup<SignInGroup>({
    email: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('^[\\w-\\.]+@[\\w-]+\\.+[\\w-]{2,4}$')],
    }),
    password: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(8), Validators.pattern('[0-9a-zA-Z!.$%^&*]*')],
    }),
  });

  signUpForm = new FormGroup<SignUpGroup>(
    {
      nickname: new FormControl<string>('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.pattern('^[\\w-\\.]+@[\\w-]+\\.+[\\w-]{2,4}$')],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(8), Validators.pattern('[0-9a-zA-Z!.$%^&*]*')],
      }),
      repeatPassword: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    },
    {
      validators: CompareSignUpPasswords.matchPasswords,
    }
  );

  async signIn(): Promise<void> {
    if (this.signInForm.invalid) {
      this.errorMessage.set('Please fill in all fields');
    } else {
      const currentUser: SignInData = {
        email: this.signInForm.controls.email.value,
        password: this.signInForm.controls.password.value,
      };
      await this.authService.signIn(currentUser);
      if (this.authService.error()) {
        this.errorMessage.set(this.authService.error());
        this.signInForm.reset();
      } else {
        await this.router.navigate(['/']);
      }
    }
  }

  togglePanel(): void {
    if (this.movePanel() === '') {
      this.movePanel.set('sign-up');
      this.isSignInPanel.set(false);
      return;
    } else if (this.movePanel() === 'sign-up') {
      this.movePanel.set('sign-in');
      this.isSignInPanel.set(true);
      return;
    } else if (this.movePanel() === 'sign-in') {
      this.movePanel.set('sign-up');
      this.isSignInPanel.set(false);
    }
  }
}
