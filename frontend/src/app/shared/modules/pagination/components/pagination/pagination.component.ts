import {Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges} from '@angular/core'
import {UtilsService} from 'src/app/shared/services/utils.service'


@Component({
  selector: 'mc-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']

})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('total') totalProps: number
  @Input('limit') limitProps: number
  @Input('currentPage') currentPageProps: number
  @Input('url') urlProps: string

  @Output() newItemEvent = new EventEmitter<string>();

  pagesCount: number
  pages: number[]

  constructor(private utilsService: UtilsService) {
  }

  ngOnInit(): void {
    console.log('this.totalProps', this.totalProps, 'this.limitProps', this.limitProps);

      this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
      this.pages = this.utilsService.range(1, this.pagesCount);

  }

  onClicked(v: number): void {

    this.newItemEvent.emit(v.toString());
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('ngOnChanges this.totalProps', this.totalProps, 'this.limitProps', this.limitProps);

      this.pagesCount = Math.ceil(this.totalProps / this.limitProps);
      this.pages = this.utilsService.range(1, this.pagesCount);



  }
}
