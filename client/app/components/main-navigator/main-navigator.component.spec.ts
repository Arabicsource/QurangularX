import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainNavigatorComponent } from './main-navigator.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Router, Event } from '@angular/router';

describe('MainNavigatorComponent', () => {
  let component: MainNavigatorComponent;
  let fixture: ComponentFixture<MainNavigatorComponent>;
  let mockRouter;
  const routerEventSubject = new BehaviorSubject<Event>(null);

  beforeEach(async(() => {
    mockRouter = jasmine.createSpy(null, Router);
    mockRouter.events = routerEventSubject.asObservable();

    TestBed.configureTestingModule({
      declarations: [ MainNavigatorComponent ],
      providers: [
        {
          provide: Router,
          useValue: mockRouter
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNavigatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should collapse when route changes', () => {
    component.isCollapsed = false;
    routerEventSubject.next(null);
    expect(component.isCollapsed).toEqual(true);
  });
});
