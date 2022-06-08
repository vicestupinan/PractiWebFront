import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Facultad } from '../models/facultad';

@Injectable({
  providedIn: 'root'
})
export class FacultadService {

  facultadURL = 'http://localhost:8080/facultadadmin/'

  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refresh$(){
    return this._refresh$;
  }

  public guardarFacultad(facultad: any) {
    return this.httpClient.post(this.facultadURL + 'nuevafacultad', facultad).pipe(tap(() => {
      this._refresh$.next();
    }))
  }

  public lista(): Observable<Facultad[]> {
    return this.httpClient.get<Facultad[]>(this.facultadURL + 'facultades')
  }
}
