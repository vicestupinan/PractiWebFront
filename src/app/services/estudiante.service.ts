import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  estudianteURL = 'http://localhost:8080/estudiante/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Estudiante[]>{
    return this.httpClient.get<Estudiante[]>(this.estudianteURL + 'lista');
  }

}
