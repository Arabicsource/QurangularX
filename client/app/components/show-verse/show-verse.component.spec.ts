import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVerseComponent } from './show-verse.component';

describe('ShowVerseComponent', () => {
  let component: ShowVerseComponent;
  let fixture: ComponentFixture<ShowVerseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVerseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVerseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
