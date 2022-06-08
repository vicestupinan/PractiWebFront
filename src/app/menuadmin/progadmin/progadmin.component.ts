import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Facultad } from 'src/app/models/facultad';
import { Programa } from 'src/app/models/programa';
import { FacultadService } from 'src/app/services/facultad.service';
import { ProgramaService } from 'src/app/services/programa.service';

@Component({
  selector: 'app-progadmin',
  templateUrl: './progadmin.component.html',
  styleUrls: ['./progadmin.component.css']
})
export class ProgadminComponent implements OnInit {

  facultades: Facultad[] = [];
  programas: Programa[] = [];
  programaForm: FormGroup;
  programaEditForm: FormGroup;
  suscription: Subscription;

  public lenght = 0;
  public page = 1;
  public pageSize = 5;

  constructor(
    public facultadService: FacultadService,
    public programaService: ProgramaService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.getProg();

    this.facultadService.lista().subscribe(
      data => {
        this.facultades = data;
      },
      err => {
        console.log(err);
      }
    );

    this.programaForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      facultad: [''],
    });

    this.programaEditForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      facultad: [''],
    });

    this.suscription = this.programaService.refresh$.subscribe(() =>{
      this.getProg();
    })

  }

  getProg = (): void => {
    this.programaService.lista().subscribe(
      (resp) => {
        this.programas = resp;
        this.lenght = this.programas.length;
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  addProg = (): void => {
    this.programaService.guardarPrograma(this.programaForm.value).subscribe(
      (resp) => {
        console.log(this.programaForm.value)
        this.programaForm.reset();
        (error: any) => {
          console.error(error);
        }
      }
    );
  };

  update(programa: Programa){
    this.programaEditForm.setValue({
      id:programa.id,
      nombre: programa.nombre,
      facultad: programa.facultad
    })
  }

  save = (): void => {
    this.programaService.guardarPrograma(this.programaEditForm.value).subscribe(
      (resp) => {
        this.programaEditForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  };


}
