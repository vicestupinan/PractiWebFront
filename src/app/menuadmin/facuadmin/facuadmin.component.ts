import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Facultad } from 'src/app/models/facultad';
import { FacultadService } from 'src/app/services/facultad.service';

@Component({
  selector: 'app-facuadmin',
  templateUrl: './facuadmin.component.html',
  styleUrls: ['./facuadmin.component.css']
})
export class FacuadminComponent implements OnInit {

  facultades: Facultad[] = [];
  facultadForm: FormGroup;
  facultadEditForm: FormGroup;
  nombre: any;
  suscription: Subscription;

  public lenght = 0;
  public page = 1;
  public pageSize = 5;

  constructor(
    public facultadService: FacultadService,
    public fb: FormBuilder,
  ) { }

  ngOnInit(): void {

    this.getFacu();

    this.facultadForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required]
    });

    this.facultadEditForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required]
    });

    this.suscription = this.facultadService.refresh$.subscribe(() =>{
      this.getFacu();
    })

  }

  getFacu = (): void => {
    this.facultadService.lista().subscribe(
      (resp) => {
        this.facultades = resp;
        this.lenght = this.facultades.length;
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  addFacu = (): void => {
    this.facultadService.guardarFacultad(this.facultadForm.value).subscribe(
      (resp) => {
        this.facultadForm.reset();
        (error: any) => {
          console.error(error);
        }
      }
    );
  };

  update(facultad: Facultad){
    this.facultadEditForm.setValue({
      id:facultad.id,
      nombre: facultad.nombre ,
    })
  }

  save = (): void => {
    this.facultadService.guardarFacultad(this.facultadEditForm.value).subscribe(
      (resp) => {
        this.facultadEditForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  };

}
