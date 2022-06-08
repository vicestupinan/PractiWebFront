import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Programa } from '../models/programa';

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {

  programaURL = 'http://localhost:8080/facultadadmin/'

  private _refresh$ = new Subject<void>();

  constructor(
    private httpClient: HttpClient
  ) { }

  get refresh$(){
    return this._refresh$;
  }

  public guardarPrograma(programa: any) {
    return this.httpClient.post(this.programaURL + 'nuevoprograma', programa).pipe(tap(() => {
      this._refresh$.next();
    }))
  }

  public lista(): Observable<Programa[]> {
    return this.httpClient.get<Programa[]>(this.programaURL + 'programas')
  }
}
