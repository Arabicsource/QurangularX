import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/map';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routeParams } from '../route-params';
import { Observable } from 'rxjs/Observable';
import { VerseRange } from '../../../../server/api-models/verse-range';
import { regexParse } from '../../utils/regex-parser';

@Component({
  selector: 'qx-show-verses',
  templateUrl: './show-verses.component.html',
  styleUrls: ['./show-verses.component.sass']
})
export class ShowVersesComponent implements OnInit, OnDestroy {
  private isAlive = true;

  public verses: Observable<VerseRange[]>;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.verses = this.activatedRoute
      .params
      .takeWhile(_ => this.isAlive)
      .map(params => this.extractVerses(params[routeParams.verses.key]));
  }

  private extractVerses(verses: string): VerseRange[] {
    const result: VerseRange[] =
      regexParse(verses, routeParams.verses.extractRegex)
        .map(x => <VerseRange>{
          chapterNumber: +x[0],
          firstVerse: +x[1],
          lastVerse: x.length > 2 ? +x[2] : +x[1]
        });
    return result;
  }

  ngOnDestroy() {
    this.isAlive = false;
  }
}
