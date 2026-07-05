import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuthRepository } from '@core/providers/repository.providers';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideAuthRepository(), provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
