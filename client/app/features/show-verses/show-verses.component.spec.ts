import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowVersesComponent } from './show-verses.component';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ActivatedRoute, Params } from '@angular/router';
import { VerseRange } from '../../../../server/api-models/verse-range';

describe('ShowVersesComponent', () => {
  let component: ShowVersesComponent;
  let fixture: ComponentFixture<ShowVersesComponent>;
  const paramsSubject = new BehaviorSubject<Params>({ verses: '1.1' });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ ShowVersesComponent ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { params: paramsSubject.asObservable() }
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
    let parsedVerses: VerseRange[];

    paramsSubject.next({ verses: '1.1' });
    component.verses$.subscribe(x => parsedVerses = x);

    expect(parsedVerses.length).toEqual(1);
    expect(parsedVerses[0].chapterNumber).toEqual(1);
    expect(parsedVerses[0].firstVerse).toEqual(1);
    expect(parsedVerses[0].lastVerse).toEqual(1);
  });

  it('should parse a single verse-range', () => {
    let parsedVerses: VerseRange[];

    paramsSubject.next({ verses: '1.1-2' });
    component.verses$.subscribe(x => parsedVerses = x);

    expect(parsedVerses.length).toEqual(1);
    expect(parsedVerses[0].chapterNumber).toEqual(1);
    expect(parsedVerses[0].firstVerse).toEqual(1);
    expect(parsedVerses[0].lastVerse).toEqual(2);
  });


  it('should parse multiple verses', () => {
    let parsedVerses: VerseRange[];

    component.verses$.subscribe(x => parsedVerses = x);
    paramsSubject.next({ verses: '1.1-2,3.4,5.67-68' });

    expect(parsedVerses.length).toEqual(3);

    // 1.1-2
    expect(parsedVerses[0].chapterNumber).toEqual(1);
    expect(parsedVerses[0].firstVerse).toEqual(1);
    expect(parsedVerses[0].lastVerse).toEqual(2);

    // 3.4
    expect(parsedVerses[1].chapterNumber).toEqual(3);
    expect(parsedVerses[1].firstVerse).toEqual(4);
    expect(parsedVerses[1].lastVerse).toEqual(4);

    // 5.67-68
    expect(parsedVerses[2].chapterNumber).toEqual(5);
    expect(parsedVerses[2].firstVerse).toEqual(67);
    expect(parsedVerses[2].lastVerse).toEqual(68);

  });

});
