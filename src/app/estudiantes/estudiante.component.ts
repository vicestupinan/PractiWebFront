import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Estudiante } from '../models/estudiante';
import { EstudianteService } from '../services/estudiante.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
  pensums = [1,2,3,4,5,6,7,8,9,10];
  aprobacion = "";
  motivo = "";
  observaciones = "";
  encargado = "";
  suscription: Subscription;

  estudianteForm : FormGroup;
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  fileInfos?: Observable<any>;

  constructor(
    public fb: FormBuilder,
    private estudianteService: EstudianteService,
  ) { }

  ngOnInit(): void {
    this.cargarEstudiantes();
    this.estudianteForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      codigo: ['', Validators.required],
      correo: ['', Validators.required],
      periodoAspira: ['', Validators.required],
      aprobacion: [''],
      motivo: [''],
      observaciones: [''],
      encargado: [''],
    });

    this.suscription = this.estudianteService.refresh$.subscribe(() =>{
      this.cargarEstudiantes();
    })
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

  update(estudiante: Estudiante){

    if(estudiante.motivo===null){
      this.motivo = "No aprobado";
    }else{
      this.motivo = estudiante.motivo;
    }

    if(estudiante.observaciones===null){
      this.observaciones = "No aprobado";
    }else{
      this.observaciones = estudiante.observaciones;
    }

    if(estudiante.observaciones===null){
      this.encargado = "No aprobado";
    }else{
      this.encargado = estudiante.encargado;
    }

    this.estudianteForm.setValue({
      id:estudiante.id,
      nombre: estudiante.nombre ,
      apellido: estudiante.apellido,
      codigo: estudiante.codigo,
      correo: estudiante.correo,
      periodoAspira: estudiante.periodoAspira,
      aprobacion: estudiante.aprobacion,
      motivo: this.motivo,
      observaciones: this.observaciones,
      encargado: this.encargado,
    })
  }

  save = (): void => {
    this.estudianteService.guardarEstudiante(this.estudianteForm.value).subscribe(
      (resp) => {
        this.estudianteForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  };

}
