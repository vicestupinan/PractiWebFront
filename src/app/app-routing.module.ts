import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { IndexComponent } from './index/index.component';
import { StudentsComponent } from './estudiantes/estudiante.component';
import { MenuadminComponent } from './menuadmin/menuadmin.component';
import { FacuadminComponent } from './menuadmin/facuadmin/facuadmin.component';
import { ProgadminComponent } from './menuadmin/progadmin/progadmin.component';
import { PensuadminComponent } from './menuadmin/pensuadmin/pensuadmin.component';
import { ReqadminComponent } from './menuadmin/reqadmin/reqadmin.component';

const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegisterComponent},
  {path: 'estudiantes', component:StudentsComponent},
  {path: 'menuadmin', component: MenuadminComponent},
  {path: 'facuadmin', component: FacuadminComponent},
  {path: 'progradmin', component: ProgadminComponent},
  {path: 'pensuamin', component: PensuadminComponent},
  {path: 'reqadmin', component: ReqadminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
