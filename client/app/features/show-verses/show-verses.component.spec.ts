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
        chapterNumber: 1,
        verseNumber: 1
      }
    ]));

    paramsSubject.next({verses: '1.1'});
    component.verses$.subscribe(x => parsedVerses = x);

    expect(parsedVerses.length).toEqual(1);
    expect(parsedVerses[0].chapterNumber).toEqual(1);
    expect(parsedVerses[0].verseNumber).toEqual(1);
  });

  it('should parse a single verse-range', () => {
    let parsedVerses: Verse[];
    mockVerseService.getVerses.and.returnValue(Observable.of([
      {
        chapterNumber: 1,
        verseNumber: 1
      },
      {
        chapterNumber: 1,
        verseNumber: 2
      }
    ]));

    paramsSubject.next({verses: '1.1-2'});
    component.verses$.subscribe(x => parsedVerses = x);

    expect(parsedVerses.length).toEqual(2);
    expect(parsedVerses[0].chapterNumber).toEqual(1);
    expect(parsedVerses[0].verseNumber).toEqual(1);
    expect(parsedVerses[1].chapterNumber).toEqual(1);
    expect(parsedVerses[1].verseNumber).toEqual(2);
  });


  it('should parse multiple verses in the order specified', () => {
    let parsedVerses: Verse[];
    mockVerseService.getVerses.and.returnValue(Observable.of([
      {
        chapterNumber: 3,
        verseNumber: 4
      },
      {
        chapterNumber: 5,
        verseNumber: 67
      },
      {
        chapterNumber: 5,
        verseNumber: 68
      },
      {
        chapterNumber: 1,
        verseNumber: 1
      },
      {
        chapterNumber: 1,
        verseNumber: 2
      }
    ]));

    component.verses$.subscribe(x => parsedVerses = x);
    paramsSubject.next({verses: '3.4,5.67-68,1.1-2'});

    expect(parsedVerses.length).toEqual(5);

    // 3.4
    expect(parsedVerses[0].chapterNumber).toEqual(3);
    expect(parsedVerses[0].verseNumber).toEqual(4);

    // 5.67-68
    expect(parsedVerses[1].chapterNumber).toEqual(5);
    expect(parsedVerses[1].verseNumber).toEqual(67);
    expect(parsedVerses[2].chapterNumber).toEqual(5);
    expect(parsedVerses[2].verseNumber).toEqual(68);

    // 1.1-2
    expect(parsedVerses[3].chapterNumber).toEqual(1);
    expect(parsedVerses[3].verseNumber).toEqual(1);
    expect(parsedVerses[4].chapterNumber).toEqual(1);
    expect(parsedVerses[4].verseNumber).toEqual(2);
  });

});
