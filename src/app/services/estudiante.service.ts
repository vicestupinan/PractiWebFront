import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  estudianteURL = 'http://localhost:8080/estudiante/'

  private _refresh$ = new Subject<void>();

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Estudiante[]>{
    return this.httpClient.get<Estudiante[]>(this.estudianteURL + 'lista');
  }

  public subir(file: File): Observable<HttpEvent<any>>{
    const formData: FormData = new FormData();
	
		formData.append('file', file);
	
		const req = new HttpRequest('POST', this.estudianteURL + 'subir', formData, {
		  reportProgress: true,
		  responseType: 'json'
		});
	
		return this.httpClient.request(req);
  }

  public guardarEstudiante(estudiante: any) {
    return this.httpClient.post(this.estudianteURL + 'actu', estudiante).pipe(tap(() => {
      this._refresh$.next();
    }))
  }

  get refresh$(){
    return this._refresh$;
  }

}
