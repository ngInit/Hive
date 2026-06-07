import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPanel } from './tags-panel';

describe('TagsPanel', () => {
  let component: TagsPanel;
  let fixture: ComponentFixture<TagsPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagsPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(TagsPanel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
