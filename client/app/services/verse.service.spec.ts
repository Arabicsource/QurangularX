import { TestBed, inject } from '@angular/core/testing';

import { VerseService } from './verse.service';

describe('VerseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VerseService]
    });
  });

  it('should be created', inject([VerseService], (service: VerseService) => {
    expect(service).toBeTruthy();
  }));
});
