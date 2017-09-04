import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api } from '../../../server/api-models/chapter';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class ChapterService {
  private hasData = false;
  private chaptersSubject = new BehaviorSubject<Api.Models.Chapter[]>(null);

  constructor(private http: Http) { }

  public getChapters(): Observable<Api.Models.Chapter[]> {
    if (!this.hasData) {
      this.http
        .get('http://localhost:4200/api/chapters')
        .map(res => <Api.Models.Chapter[]>res.json())
        .map(chapters => [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber))
        .subscribe((data: Api.Models.Chapter[]) => {
          this.hasData = true;
          this.chaptersSubject.next(data);
        });
    }

    return this.chaptersSubject.asObservable();
  }

}
