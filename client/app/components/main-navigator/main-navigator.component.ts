import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qx-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.sass']
})
export class MainNavigatorComponent {
  public isCollapsed = true;

  constructor(router: Router) {
    router.events.subscribe(x => this.isCollapsed = true);
  }

  public toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
