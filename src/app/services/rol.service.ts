import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/jwt-dto';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolURL = 'http://localhost:8080/auth/'

  constructor(private httpClient: HttpClient) { }

  public lista(): Observable<Rol[]>{
    return this.httpClient.get<Rol[]>(this.rolURL + 'rol');
  }
}
