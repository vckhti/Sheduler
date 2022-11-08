import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {clientTypeInterface} from "../types/clientType.interface";

@Injectable({
  providedIn: 'root'
})
export class DictionaryService {

  constructor(private http: HttpClient) { }

  fetchRegions(): Observable<any> {
    const url = 'http://10.5.1.208:8082/api/web/v1/clients/clientTypes/allClientTypes';
    const https = 'https://10.5.1.208:8443/api/web/v1/clients/clientTypes/allClientTypes';

    return this.http.get<any>(url)
  }

  deleteClient(client: clientTypeInterface): Observable<any>{
    const url = 'http://10.5.1.208:8082/api/web/v1/clients/clientTypes/deleteClientType';

    return this.http.delete<any>(url, {body: {id: client.id}})
  }

  addClient(client: clientTypeInterface): Observable<any> {
    const url = 'http://10.5.1.208:8082/api/web/v1/clients/clientTypes/createClientType';

    console.log('clientId', client);
    return this.http.post<any>(url, client)
  }

  editClient(client: clientTypeInterface): Observable<any> {
    const url = `http://10.5.1.208:8082/api/web/v1/clients/clientTypes/modifyClientType`;

    console.log('edit clientId', client);

    return this.http.put<any>(url, client)
  }
}
