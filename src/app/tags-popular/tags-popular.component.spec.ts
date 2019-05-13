import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsPopularComponent } from './tags-popular.component';

describe('TagsPopularComponent', () => {
  let component: TagsPopularComponent;
  let fixture: ComponentFixture<TagsPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
