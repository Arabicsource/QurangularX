import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../../../shared/api-models/chapter';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { environment } from '../../environments/environment';


@Injectable()
export class ChapterService {
  private hasData = false;
  private chaptersSubject = new BehaviorSubject<Chapter[]>(null);

  constructor(private http: Http) { }

  public getChapters(): Observable<Chapter[]> {
    if (!this.hasData) {
      this.http
        .post(environment.apiServerUrl + 'api/chapters', null)
        .map(res => <Chapter[]>res.json())
        .map(chapters => [...chapters].sort((a, b) => a.chapterNumber - b.chapterNumber))
        .subscribe((data: Chapter[]) => {
          this.hasData = true;
          this.chaptersSubject.next(data);
        });
    }

    return this.chaptersSubject.asObservable();
  }

}
