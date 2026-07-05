import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideJamendoRepository } from '@core/providers/repository.providers';
import { provideRouter } from '@angular/router';
import { TagsPage } from './tags-page';

describe('TagsPage', () => {
  let component: TagsPage;
  let fixture: ComponentFixture<TagsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsPage],
      providers: [provideJamendoRepository(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create', () => {
    expect(component).toBeTruthy();
  });
});
