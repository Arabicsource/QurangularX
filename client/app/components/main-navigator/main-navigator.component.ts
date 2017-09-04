import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'qx-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.sass']
})
export class MainNavigatorComponent implements OnInit {
  public isCollapsed = true;

  constructor(private router: Router) {}

  public toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
    this.router.events.subscribe(x => this.isCollapsed = true);
  }

}
