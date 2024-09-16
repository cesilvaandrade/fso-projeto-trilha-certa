import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import {AppComponent} from "./app.component";
import {TurnoComponent} from "./turno/turno.component";
import {TrilhaComponent} from "./trilha/trilha.component";

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'login', component: LoginComponent },
  { path: 'turno/:cpf', component: TurnoComponent },
  { path: 'trilha/:cpf/:turno', component: TrilhaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
