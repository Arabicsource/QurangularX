import 'rxjs/add/operator/takeWhile';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { routeParams } from '../route-params';

@Component({
  selector: 'qx-show-verses',
  templateUrl: './show-verses.component.html',
  styleUrls: ['./show-verses.component.sass']
})
export class ShowVersesComponent implements OnInit, OnDestroy {
  private isAlive = true;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute
      .params
      .takeWhile(_ => this.isAlive)
      .subscribe(params => this.showVerses(params[routeParams.verses.key]));
  }

  private showVerses(verses: string) {
    console.log('verses', verses);
    verses.replace(routeParams.verses.extractRegex, function(m, g1, g2, g3) {
      console.log('****', m, g1, g2, g3);
      return '';
    });
  }


  ngOnDestroy() {
    this.isAlive = false;
  }

}
