import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TurnoComponent } from '../turno/turno.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";



@NgModule({
  declarations: [
    TurnoComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule
  ]
})
export class TurnoModule { }
