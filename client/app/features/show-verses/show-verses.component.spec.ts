import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVersesComponent } from './show-verses.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Params } from '@angular/router';
import { Verse } from '../../../../shared/api-models/verse';
import { VerseService } from '../../services/verse.service';
import { Observable } from 'rxjs/Observable';
import { ShowVerseComponent } from '../../components/show-verse/show-verse.component';

describe('ShowVersesComponent', () => {
  let component: ShowVersesComponent;
  let fixture: ComponentFixture<ShowVersesComponent>;
  const paramsSubject = new BehaviorSubject<Params>({verses: '1.1'});
  let mockVerseService;

  beforeEach(async(() => {
    mockVerseService = jasmine.createSpyObj(null, ['getVerses']);
    mockVerseService.getVerses.and.returnValue(Observable.of([]));
    TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [ShowVersesComponent, ShowVerseComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {params: paramsSubject.asObservable()}
          },
          {
            provide: VerseService,
            useValue: mockVerseService
          }
        ]
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

  it('should parse a single verse', () => {
    let parsedVerses: Verse[];
    mockVerseService.getVerses.and.returnValue(Observable.of([
      {
        chapter: 1,
        verse: 1
      }
    ]));

    paramsSubject.next({verses: '1.1'});
    component.verses$.subscribe(x => parsedVerses = x);

    expect(parsedVerses.length).toEqual(1);
    expect(parsedVerses[0].chapter).toEqual(1);
    expect(parsedVerses[0].verse).toEqual(1);
  });

  it('should parse a single verse-range', () => {
    let parsedVerses: Verse[];
    mockVerseService.getVerses.and.returnValue(Observable.of([
      {
        chapter: 1,
        verse: 1
      },
      {
        chapter: 1,
        verse: 2
      }
    ]));

    paramsSubject.next({verses: '1.1-2'});
    component.verses$.subscribe(x => parsedVerses = x);

    expect(parsedVerses.length).toEqual(2);
    expect(parsedVerses[0].chapter).toEqual(1);
    expect(parsedVerses[0].verse).toEqual(1);
    expect(parsedVerses[1].chapter).toEqual(1);
    expect(parsedVerses[1].verse).toEqual(2);
  });


  it('should parse multiple verses in the order specified', () => {
    let parsedVerses: Verse[];
    mockVerseService.getVerses.and.returnValue(Observable.of([
      {
        chapter: 3,
        verse: 4
      },
      {
        chapter: 5,
        verse: 67
      },
      {
        chapter: 5,
        verse: 68
      },
      {
        chapter: 1,
        verse: 1
      },
      {
        chapter: 1,
        verse: 2
      }
    ]));

    component.verses$.subscribe(x => parsedVerses = x);
    paramsSubject.next({verses: '3.4,5.67-68,1.1-2'});

    expect(parsedVerses.length).toEqual(5);

    // 3.4
    expect(parsedVerses[0].chapter).toEqual(3);
    expect(parsedVerses[0].verse).toEqual(4);

    // 5.67-68
    expect(parsedVerses[1].chapter).toEqual(5);
    expect(parsedVerses[1].verse).toEqual(67);
    expect(parsedVerses[2].chapter).toEqual(5);
    expect(parsedVerses[2].verse).toEqual(68);

    // 1.1-2
    expect(parsedVerses[3].chapter).toEqual(1);
    expect(parsedVerses[3].verse).toEqual(1);
    expect(parsedVerses[4].chapter).toEqual(1);
    expect(parsedVerses[4].verse).toEqual(2);
  });

});
