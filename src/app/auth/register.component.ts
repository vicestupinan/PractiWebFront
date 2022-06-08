import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { RolService } from '../services/rol.service';
import { ProgramaService } from '../services/programa.service';
import { Rol } from '../models/rol';
import { NuevoUsuario } from '../models/nuevo-usuario';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  nuevoUsuario: NuevoUsuario;
  usuarioForm: FormGroup;
  
  roles: Rol[] = [];
  nombre: any;
  apellido: any;
  codigo: any;
  correo: any;
  telefono: any;
  rol: any;
  password: any;

  rols: string[] = [];

  constructor(
    public usuarioService: UsuarioService,
    private authService: AuthService,
    public rolService: RolService,
    public programaService: ProgramaService,

  ) { }

  ngOnInit(): void {
    this.rolService.lista().subscribe(
      data => {
        this.roles = data;
      },
      err => {
        console.log(err);
      }
    );

  }

  register(): void{
    console.log(this.rol);
    if(JSON.stringify(this.rol).includes("ROLE_ADMIN")){
      this.rols.push("admin");
    }
    if(JSON.stringify(this.rol).includes("ROLE_COORD")){
      this.rols.push("coord");
    }
    if(JSON.stringify(this.rol).includes("ROLE_SUPERV")){
      this.rols.push("coord");
    }

    this.nuevoUsuario = new NuevoUsuario(this.nombre, this.apellido, this.codigo, this.correo, this.telefono, this.password, this.rols);
    this.authService.nuevo(this.nuevoUsuario).subscribe(
      (resp) => {
        this.usuarioForm.reset();
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
