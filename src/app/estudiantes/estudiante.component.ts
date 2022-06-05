import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { TokenService } from '../services/token.service';
import { Router } from '@angular/router';

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

  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(
    private estudianteService: EstudianteService,
    private tokenService: TokenService,
    private router: Router
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

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(): void {
    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.estudianteService.subir(this.currentFile).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
              this.ngOnInit();
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.fileInfos = this.estudianteService.lista();
            }
          },
          (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          });
          setTimeout(
            function(){ 
              window.location.reload();
            }, 2000);
      }
      this.selectedFiles = undefined;
    }
  }

}
