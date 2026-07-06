import { FormControl, FormGroup } from '@angular/forms';
import { CompareSignUpPasswords } from './compare-sign-up-passwords.directive';

describe('CompareSignUpPasswordsDirective', () => {
  it('should create an instance', () => {
    const directive = new CompareSignUpPasswords();
    expect(directive).toBeTruthy();
  });
});

describe('CompareSignUpPasswords directive', () => {
  describe('Passwords are the same', () => {
    it.each([
      ['', ''],
      ['password', 'password'],
    ])('It returns null', (password, repeat) => {
      const group = createGroup(password, repeat);
      expect(CompareSignUpPasswords.matchPasswords(group)).toBeNull();
    });
  });

  describe('Passwords are different', () => {
    it.each([
      ['', '0'],
      ['password', 'pаssword'],
      ['pass', 'Pass'],
      ['abc', 'xyz'],
    ])('It returns { matchPasswords: true }. %s not equal %s', (password, repeat) => {
      const group = createGroup(password, repeat);
      expect(CompareSignUpPasswords.matchPasswords(group)).toStrictEqual({ matchPasswords: true });
    });
  });
});

function createGroup(password: string, repeatPassword: string): FormGroup {
  return new FormGroup({
    password: new FormControl(password, { nonNullable: true }),
    repeatPassword: new FormControl(repeatPassword, { nonNullable: true }),
  });
}
