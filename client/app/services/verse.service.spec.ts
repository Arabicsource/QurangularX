import { TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { VerseService } from './verse.service';
import { VerseRange } from '../../../shared/api-models/verse-range';
import { Verse } from '../../../shared/api-models/verse';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('VerseService', () => {
  let service: VerseService;
  let mockBackend: MockBackend;
  let lastHttpConnection: MockConnection;

  beforeEach(() => {
    mockBackend = new MockBackend();
    mockBackend.connections.subscribe(x => lastHttpConnection = x);
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        VerseService,
        {
          provide: XHRBackend, useValue: mockBackend
        }
      ]
    });
  });

  beforeEach(inject([VerseService], x => service = x));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return verses in order requested', fakeAsync(() => {
    const requestedVerses: VerseRange[] = [
      // Second chapter
      {
        chapterNumber: 2,
        firstVerse: 3,
        lastVerse: 4
      },
      // Followed by first chapter
      {
        chapterNumber: 1,
        firstVerse: 2,
        lastVerse: 2
      },
      // Followed by first chapter's previous verse
      {
        chapterNumber: 1,
        firstVerse: 1,
        lastVerse: 1
      },
      // Second chapter, same verses again
      {
        chapterNumber: 2,
        firstVerse: 3,
        lastVerse: 4
      }
    ];

    const unsortedVersesFromServer = [
      {
        chapterNumber: 2,
        verseNumber: 4
      },
      {
        chapterNumber: 2,
        verseNumber: 3
      },
      {
        chapterNumber: 1,
        verseNumber: 2
      },
      {
        chapterNumber: 1,
        verseNumber: 1
      },
    ];

    let receivedVerses: Verse[];
    service.getVerses(requestedVerses).subscribe(x => receivedVerses = x);

    lastHttpConnection.mockRespond(
      new Response(
        new ResponseOptions({
          body: JSON.stringify(unsortedVersesFromServer)
        })
      )
    );

    tick();

    expect(receivedVerses.length).toEqual(6);
    // 2.3-?
    expect(receivedVerses[0].chapterNumber).toEqual(2);
    expect(receivedVerses[0].verseNumber).toEqual(3);
    // 2.?-4
    expect(receivedVerses[1].chapterNumber).toEqual(2);
    expect(receivedVerses[1].verseNumber).toEqual(4);
    // 1.2
    expect(receivedVerses[2].chapterNumber).toEqual(1);
    expect(receivedVerses[2].verseNumber).toEqual(2);
    // 1.1
    expect(receivedVerses[3].chapterNumber).toEqual(1);
    expect(receivedVerses[3].verseNumber).toEqual(1);
    // 2.3-?
    expect(receivedVerses[4].chapterNumber).toEqual(2);
    expect(receivedVerses[4].verseNumber).toEqual(3);
    // 2.?-4
    expect(receivedVerses[5].chapterNumber).toEqual(2);
    expect(receivedVerses[5].verseNumber).toEqual(4);

  }));
});
