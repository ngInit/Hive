import { Component, inject, QueryList, signal, ViewChildren } from '@angular/core';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CompareSignUpPasswords } from '@shared/directives/compare-sign-up-passwords.directive';
import { SignInData, SignUpData } from '@core/models/auth.model';
import { FirebaseService } from '@core/services/firebase.service';
import { Router } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatSuffix } from '@angular/material/input';
import { ShowPassword } from '@shared/directives/show-password.directive';

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
  imports: [
    MatFormField,
    MatLabel,
    MatInput,
    ReactiveFormsModule,
    MatError,
    MatButton,
    MatIcon,
    MatIconButton,
    MatSuffix,
    ShowPassword,
  ],
  templateUrl: './sign-page.html',
  styleUrl: './sign-page.scss',
})
export class SignPage {
  readonly movePanel = signal<string>('');
  readonly isSignInPanel = signal(true);
  private readonly authService = inject(FirebaseService);
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

  @ViewChildren(ShowPassword)
  private showPasswordDirectives: QueryList<ShowPassword> | undefined;

  private resetAll(): void {
    this.errorMessage.set(null);
    if (this.showPasswordDirectives) {
      this.showPasswordDirectives.forEach((directive) => {
        directive.reset();
      });
    }
  }

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

  async signUp(): Promise<void> {
    if (this.signUpForm.invalid) {
      this.errorMessage.set('Please fill in all fields');
    } else {
      const newUser: SignUpData = {
        nickname: this.signUpForm.controls.nickname.value,
        email: this.signUpForm.controls.email.value,
        password: this.signUpForm.controls.password.value,
        repeatPassword: this.signUpForm.controls.repeatPassword.value,
      };
      await this.authService.signUp(newUser);
      if (this.authService.error()) {
        this.errorMessage.set(this.authService.error());
      } else {
        await this.router.navigate(['/']);
      }
    }
  }

  togglePanel(): void {
    this.resetAll();
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
