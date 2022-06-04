import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-students',
  templateUrl: './estudiante.component.html',
  styleUrls: ['./estudiante.component.css']
})
export class StudentsComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  roles: string[];
  isAuthRole = false;
  public page = 1;
  public pageSize = 5;
  public lenght = 0;

  constructor(
    private estudianteService: EstudianteService,
    private tokenService: TokenService

  ) { }

  ngOnInit(): void {
    this.cargarEstudiantes()
  }

  cargarEstudiantes(): void {
    this.estudianteService.lista().subscribe(
      data => {
        this.estudiantes = data;
        this.lenght = this.estudiantes.length;
      },
      err => {
        console.log(err);
      }
    );
  }
}
