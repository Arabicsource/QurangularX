import { TestBed, inject, fakeAsync, tick } from '@angular/core/testing';

import { ChapterService } from './chapter.service';
import { HttpModule, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Chapter } from '../../../shared/api-models/chapter';

describe('ChapterService', () => {
  let service: ChapterService;
  let mockBackend: MockBackend;
  let lastHttpConnection: MockConnection;

  beforeEach(() => {
    mockBackend = new MockBackend();
    mockBackend.connections.subscribe(x => lastHttpConnection = x);
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [
        ChapterService,
        {
          provide: XHRBackend, useValue: mockBackend
        }
      ]
    });
  });

  beforeEach(inject([ChapterService], x => service = x));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return chapters in sorted order', fakeAsync(() => {
    let chapters: Chapter[];
    service.getChapters().subscribe(x => chapters = x);

    const expectedData: Chapter[] = [
      <any>{
        chapter: 2
      },
      <any>{
        chapter: 1
      }
    ];

    lastHttpConnection.mockRespond(
      new Response(
        new ResponseOptions({
          body: JSON.stringify(expectedData)
        })
      )
    );

    tick();

    expect(chapters.length).toEqual(2);
    expect(chapters[0].chapter).toEqual(1);
    expect(chapters[1].chapter).toEqual(2);
  }));

});
