import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { IndexComponent } from './index/index.component';
import { StudentsComponent } from './estudiantes/estudiante.component';

const routes: Routes = [
  {path: '', component:IndexComponent},
  {path: 'login', component:LoginComponent},
  {path: 'registro', component:RegisterComponent},
  {path: 'estudiantes', component:StudentsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
