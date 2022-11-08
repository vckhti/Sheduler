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

  addClient(client: string): Observable<any> {
    const url = 'http://10.5.1.208:8082/api/web/v1/clients/clientTypes/createClientType';
    const args: clientTypeInterface = {

      type: client
    }
    console.log('clientId', client);
    //return of(null);
    return this.http.post<any>(url, args)
  }

  editClient(id:number, client: string): Observable<any> {
    const url = `http://10.5.1.208:8082/api/web/v1/clients/clientTypes/modifyClientType`;
    const args: clientTypeInterface = {
      id: id,
      type: client
    }
    console.log('edit clientId', args);

    return this.http.put<any>(url, args)
  }
}
