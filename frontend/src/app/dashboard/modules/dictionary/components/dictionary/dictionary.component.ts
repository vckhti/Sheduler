import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-dictionary',
  templateUrl: './dictionary.component.html',
  styleUrls: ['./dictionary.component.scss']
})
export class DictionaryComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
  }

}
