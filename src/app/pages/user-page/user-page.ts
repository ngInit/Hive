import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FirebaseService } from '@core/services/firebase.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInput, MatLabel, MatSuffix } from '@angular/material/input';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIcon } from '@angular/material/icon';
import { ShowPassword } from '@shared/directives/show-password.directive';
import { CompareSignUpPasswords } from '@shared/directives/compare-sign-up-passwords.directive';
import { UpdateData } from '@core/models/auth.model';
import { NavigationService } from '@core/services/navigation.service';

interface UpdateGroup {
  nickname: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  repeatPassword: FormControl<string>;
}

@Component({
  selector: 'hive-user-page',
  templateUrl: './user-page.html',
  styleUrl: './user-page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    MatFormField,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    MatError,
    MatIcon,
    MatIconButton,
    MatInput,
    MatSuffix,
    ShowPassword,
    MatProgressSpinner,
  ],
})
export class UserPage {
  private readonly authService = inject(FirebaseService);
  private readonly navigationService = inject(NavigationService);
  protected readonly user = this.authService.currentUser;
  public readonly errorMessage = signal<string | null>(null);
  public readonly isUpdating = this.authService.isLoading;

  profileForm = new FormGroup<UpdateGroup>(
    {
      nickname: new FormControl<string>('', {
        nonNullable: true,
      }),
      email: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.pattern('^[\\w-\\.]+@[\\w-]+\\.+[\\w-]{2,4}$')],
      }),
      password: new FormControl<string>('', {
        nonNullable: true,
        validators: [Validators.minLength(8), Validators.pattern('[0-9a-zA-Z!.$%^&*]*')],
      }),
      repeatPassword: new FormControl<string>('', {
        nonNullable: true,
      }),
    },
    {
      validators: CompareSignUpPasswords.matchPasswords,
    }
  );

  async updateProfile(): Promise<void> {
    this.isUpdating.set(true);
    const user = this.user();
    if (!user) {
      return;
    }
    if (this.profileForm.invalid) {
      this.errorMessage.set('Please, check all the necessary fields');
      this.isUpdating.set(false);
      return;
    }
    const newUser: UpdateData = {
      nickname: this.profileForm.controls.nickname.value,
      email: this.profileForm.controls.email.value,
      password: this.profileForm.controls.password.value,
    };
    const response = await this.authService.updateUserData(user.uid, newUser);
    if (response) {
      this.errorMessage.set('Data updated successfully');
      this.profileForm.reset();
    } else {
      this.errorMessage.set(this.authService.error());
    }
  }

  async deleteProfile(): Promise<void> {
    const user = this.user();
    if (!user) {
      return;
    }
    try {
      await this.authService.deleteUserData(user);
      await this.navigationService.goHome();
    } catch {
      this.errorMessage.set(this.authService.error());
    }
  }
}
