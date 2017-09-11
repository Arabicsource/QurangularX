import { TestBed, inject } from '@angular/core/testing';

import { VerseService } from './verse.service';
import { Http } from '@angular/http';

describe('VerseService', () => {
  let mockHttp;

  beforeEach(() => {
    mockHttp = jasmine.createSpyObj(null, ['post']);

    TestBed.configureTestingModule({
      providers: [
        VerseService,
        {
          provide: Http,
          useValue: mockHttp
        }
      ]
    });
  });

  it('should be created', inject([VerseService], (service: VerseService) => {
    expect(service).toBeTruthy();
  }));
});
