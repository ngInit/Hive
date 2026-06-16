import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[hiveCompareSignUpPasswords]',
})
export class CompareSignUpPasswords {
  static matchPasswords(group: AbstractControl): ValidationErrors | null {
    const firstPassword = String(group.get('password')?.value);
    const secondPassword = String(group.get('repeatPassword')?.value);
    if (firstPassword !== secondPassword) {
      group.get('repeatPassword')?.setErrors({ ...group.get('repeatPassword')?.errors, matchPasswords: true });
      return { matchPasswords: true };
    }
    return null;
  }
}
