import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) {
  }

  fetchRegions(): Observable<any> {
    const url = 'http://10.5.1.208:8082/api/web/v1/routers/allRouters';
    const https = 'https://10.5.1.208:8443/api/web/v1/clients/clientTypes/allClientTypes';

    return this.http.get<any>(url)
  }


  addClient(client: any): Observable<any> {
    const url = 'http://10.5.1.208:8082/api/web/v1/routers/createRouter';

    console.log('add router', client);
    return this.http.post<any>(url, client)
  }

  editClient(client: any): Observable<any> {
    const url = `http://10.5.1.208:8082/api/web/v1/routers/modifyRouter`;

    console.log('edit router', client);

    return this.http.put<any>(url, client)
  }
}
