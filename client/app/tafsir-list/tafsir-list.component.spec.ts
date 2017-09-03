import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TafsirListComponent } from './tafsir-list.component';

describe('TafsirListComponent', () => {
  let component: TafsirListComponent;
  let fixture: ComponentFixture<TafsirListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TafsirListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TafsirListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
