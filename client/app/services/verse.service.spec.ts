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
        chapter: 2,
        firstVerse: 3,
        lastVerse: 4
      },
      // Followed by first chapter
      {
        chapter: 1,
        firstVerse: 2,
        lastVerse: 2
      },
      // Followed by first chapter's previous verse
      {
        chapter: 1,
        firstVerse: 1,
        lastVerse: 1
      },
      // Second chapter, same verses again
      {
        chapter: 2,
        firstVerse: 3,
        lastVerse: 4
      }
    ];

    const unsortedVersesFromServer = [
      {
        chapter: 2,
        verse: 4
      },
      {
        chapter: 2,
        verse: 3
      },
      {
        chapter: 1,
        verse: 2
      },
      {
        chapter: 1,
        verse: 1
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
    expect(receivedVerses[0].chapter).toEqual(2);
    expect(receivedVerses[0].verse).toEqual(3);
    // 2.?-4
    expect(receivedVerses[1].chapter).toEqual(2);
    expect(receivedVerses[1].verse).toEqual(4);
    // 1.2
    expect(receivedVerses[2].chapter).toEqual(1);
    expect(receivedVerses[2].verse).toEqual(2);
    // 1.1
    expect(receivedVerses[3].chapter).toEqual(1);
    expect(receivedVerses[3].verse).toEqual(1);
    // 2.3-?
    expect(receivedVerses[4].chapter).toEqual(2);
    expect(receivedVerses[4].verse).toEqual(3);
    // 2.?-4
    expect(receivedVerses[5].chapter).toEqual(2);
    expect(receivedVerses[5].verse).toEqual(4);

  }));
});
