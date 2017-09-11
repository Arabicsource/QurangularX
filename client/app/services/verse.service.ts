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
      .post(environment.apiServerUrl + 'api/verses', { verses })
      .map(res => <Verse[]>res.json());
  }

}
