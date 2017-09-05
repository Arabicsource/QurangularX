import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVersesComponent } from './show-verses.component';

describe('ShowVersesComponent', () => {
  let component: ShowVersesComponent;
  let fixture: ComponentFixture<ShowVersesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowVersesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowVersesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
