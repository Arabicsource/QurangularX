import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'qx-main-navigator',
  templateUrl: './main-navigator.component.html',
  styleUrls: ['./main-navigator.component.sass']
})
export class MainNavigatorComponent {
  public isCollapsed = true;

  public toggleIsCollapsed() {
    this.isCollapsed = !this.isCollapsed;
  }

}
