import { Component, OnInit } from '@angular/core';
import { ChapterService } from '../../services/chapter.service';
import { Observable } from 'rxjs/Observable';
import { Chapter } from '../../../../shared/api-models/chapter';

@Component({
  selector: 'qx-chapter-list',
  templateUrl: './chapter-list.component.html',
  styleUrls: ['./chapter-list.component.css']
})
export class ChapterListComponent implements OnInit {
  public chapters: Observable<Chapter[]>;

  constructor(private chapterService: ChapterService) { }

  ngOnInit() {
    this.chapters = this.chapterService.getChapters();
  }

}
