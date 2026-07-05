import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAuthRepository } from '@core/providers/repository.providers';
import { UserPage } from './user-page';

describe('UserPage', () => {
  let component: UserPage;
  let fixture: ComponentFixture<UserPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPage],
      providers: [provideAuthRepository()],
    }).compileComponents();

    fixture = TestBed.createComponent(UserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
