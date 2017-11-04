import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/takeUntil';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routeParams } from '../route-params';
import { Observable } from 'rxjs/Observable';
import { VerseRange } from '../../../../shared/api-models/verse-range';
import { regexParse } from '../../../../shared/utils/regex-parser';
import { Verse } from '../../../../shared/api-models/verse';
import { VerseService } from '../../services/verse.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'qx-show-verses',
  templateUrl: './show-verses.component.html',
  styleUrls: ['./show-verses.component.sass']
})
export class ShowVersesComponent implements OnInit, OnDestroy {
  private destroyed$ = new Subject<any>();

  public verses$: Observable<Verse[]>;

  constructor(private activatedRoute: ActivatedRoute, private verseService: VerseService) {
  }

  ngOnInit() {
    this.verses$ = this.activatedRoute
      .params
      .takeUntil(this.destroyed$)
      .map(params => this.extractVerses(params[routeParams.verses.key]))
      .switchMap(verses => this.verseService.getVerses(verses));
  }

  private extractVerses(verses: string): VerseRange[] {
    const result: VerseRange[] =
      regexParse(verses, routeParams.verses.extractRegex)
        .map(x => <VerseRange>{
            chapter: +x[1],
            firstVerse: +x[2],
            lastVerse: +x[3] || +x[2]
        });
    return result;
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }
}
