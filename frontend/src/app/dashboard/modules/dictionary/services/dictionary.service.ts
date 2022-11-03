import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  fetchRegions(): Observable<any> {
    const url = 'http://10.5.1.208:8082/api/web/v1/clients/clientTypes/allClientTypes';

    return this.http.get<any>(url)
  }
}
