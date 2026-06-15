import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatError, MatFormField, MatInput, MatLabel } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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

  signUpForm = new FormGroup<SignUpGroup>({
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
  });

  signIn() {
    console.log(this.signInForm.value);
  }

  toggle(): void {
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
