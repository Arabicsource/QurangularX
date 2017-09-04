import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ChapterListComponent } from './chapter-list.component';
import { ChapterService } from '../../services/chapter.service';
import { Observable } from 'rxjs/Observable';
import { RouterTestingModule } from '@angular/router/testing';
import { Api } from '../../../../server/api-models/chapter';
import { By } from '@angular/platform-browser';

describe('ChapterListComponent', () => {
  let component: ChapterListComponent;
  let fixture: ComponentFixture<ChapterListComponent>;
  let mockChapterService;

  const chaptersData: Api.Models.Chapter[] = [
    {
      englishName: 'english-name-2',
      chapterNumber: 2,
      arabicName: 'arabic-name-2',
      numberOfVerses: 2
    },
    {
      englishName: 'english-name-1',
      chapterNumber: 1,
      arabicName: 'arabic-name-1',
      numberOfVerses: 1
    }
  ];

  beforeEach(async(() => {
    mockChapterService = jasmine.createSpyObj(null, ['getChapters']);
    mockChapterService.getChapters.and.returnValue(Observable.of(chaptersData));

    TestBed.configureTestingModule({
      declarations: [ ChapterListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        {
          provide: ChapterService,
          useValue: mockChapterService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChapterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should render all chapters', () => {
    fixture.detectChanges();
    const linkElements = fixture.debugElement.queryAll(By.css('a'));
    expect(linkElements.length).toEqual(2);
    expect(linkElements[0].nativeElement.attributes['href'].value).toEqual('/1.1');
    expect(linkElements[1].nativeElement.attributes['href'].value).toEqual('/2.1');
  });
});
