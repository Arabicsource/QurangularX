import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api } from '../../../server/api-models/chapter';
import { Http } from '@angular/http';


@Injectable()
export class ChapterService {

  constructor(private http: Http) { }

  public getChapters(): Observable<Api.Models.Chapter[]> {
    console.log('Getting data');
    return this.http.get('http://localhost:4200/api/chapters').map(res => res.json());
  }

}
