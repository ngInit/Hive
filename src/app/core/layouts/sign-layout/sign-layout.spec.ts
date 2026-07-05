import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideAuthRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { SignLayout } from './sign-layout';

describe('SignLayout', () => {
  let component: SignLayout;
  let fixture: ComponentFixture<SignLayout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignLayout],
      providers: [provideAuthRepository(), provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(SignLayout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
