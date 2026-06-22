import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[hiveShowPassword]',
  exportAs: 'hiveShowPassword',
})
export class ShowPassword {
  public visible = false;

  @HostBinding('type')
  protected type: 'password' | 'text' = 'password';

  reset(): void {
    this.visible = false;
    this.type = 'password';
  }

  toggle(): void {
    this.visible = !this.visible;
    this.type = this.visible ? 'text' : 'password';
  }
}
