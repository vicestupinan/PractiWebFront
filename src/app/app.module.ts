import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login.component';
import { RegisterComponent } from './auth/register.component';
import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';
import { interceptorProvider } from './interceptors/interceptor.service';
import { StudentsComponent } from './estudiantes/estudiante.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuadminComponent } from './menuadmin/menuadmin.component';
import { FacuadminComponent } from './menuadmin/facuadmin/facuadmin.component';
import { ProgadminComponent } from './menuadmin/progadmin/progadmin.component';
import { PensuadminComponent } from './menuadmin/pensuadmin/pensuadmin.component';
import { ReqadminComponent } from './menuadmin/reqadmin/reqadmin.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    MenuComponent,
    IndexComponent,
    StudentsComponent,
    MenuadminComponent,
    FacuadminComponent,
    ProgadminComponent,
    PensuadminComponent,
    ReqadminComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }


