import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { VerseReference } from '../../../../shared/api-models/verse-reference';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'qx-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.sass']
})
export class AnalysisComponent implements OnDestroy {
  private destroyed$ = new Subject<any>();
  public verseReference$: Observable<VerseReference>;

  constructor(private activatedRoute: ActivatedRoute) {
    this.verseReference$ = activatedRoute
      .params
      .takeUntil(this.destroyed$)
      .map(x => <VerseReference> { chapter: x['chapter'], verse: x['verse']} );
  }

  ngOnDestroy() {
    this.destroyed$.complete();
  }

}
