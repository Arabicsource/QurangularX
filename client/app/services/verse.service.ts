import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { VerseRange } from '../../../shared/api-models/verse-range';
import { Observable } from 'rxjs/Observable';
import { Verse } from '../../../shared/api-models/verse';
import { environment } from '../../environments/environment';

@Injectable()
export class VerseService {

  constructor(private http: Http) { }

  public getVerses(verses: VerseRange[]): Observable<Verse[]> {
    return this.http
      .post(environment.apiServerUrl + 'api/verses', {verses})
      .map(res => this.sortVerses(verses, <Verse[]>res.json()));
  }

  private sortVerses(requestedVerses: VerseRange[], unsortedVerses: Verse[]): Verse[] {
    const sortedVerses = unsortedVerses.sort((v1: Verse, v2: Verse) => {
      if (v1.chapterNumber !== v2.chapterNumber) {
        return v1.chapterNumber - v2.chapterNumber;
      }
      return v1.verseNumber - v2.verseNumber;
    });

    const verseMatchesRequest = function (requestedVerse: VerseRange, verse: Verse): boolean {
      return (
        verse.chapterNumber === requestedVerse.chapterNumber
        && verse.verseNumber >= requestedVerse.firstVerse
        && verse.verseNumber <= requestedVerse.lastVerse);

    };

    const result: Verse[] = [];
    for (const requestedVerse of requestedVerses) {
      for (const verse of sortedVerses) {
        if (verseMatchesRequest(requestedVerse, verse)) {
          result.push(verse);
        }
      }
    }

    return result;
  }

}
