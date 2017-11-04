import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { VerseRange } from '../../../shared/api-models/verse-range';
import { Observable } from 'rxjs/Observable';
import { Verse } from '../../../shared/api-models/verse';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/map';

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
      if (v1.chapter !== v2.chapter) {
        return v1.chapter - v2.chapter;
      }
      return v1.verse - v2.verse;
    });

    const verseMatchesRequest = function (requestedVerse: VerseRange, verse: Verse): boolean {
      return (
        verse.chapter === requestedVerse.chapter
        && verse.verse >= requestedVerse.firstVerse
        && verse.verse <= requestedVerse.lastVerse);

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
