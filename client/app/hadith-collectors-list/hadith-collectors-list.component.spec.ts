import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithCollectorsListComponent } from './hadith-collectors-list.component';

describe('HadithCollectorsListComponent', () => {
  let component: HadithCollectorsListComponent;
  let fixture: ComponentFixture<HadithCollectorsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithCollectorsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithCollectorsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
