import { Component, Input } from '@angular/core';
import { Verse } from '../../../../shared/api-models/verse';

@Component({
  selector: 'qx-show-verse',
  templateUrl: './show-verse.component.html',
  styleUrls: ['./show-verse.component.sass']
})
export class ShowVerseComponent {
  @Input()
  public verse: Verse;
}
