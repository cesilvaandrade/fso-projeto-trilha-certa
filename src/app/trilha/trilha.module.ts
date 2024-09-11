import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrilhaComponent } from '../trilha/trilha.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";



@NgModule({
  declarations: [
    TrilhaComponent
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule
  ]
})
export class TrilhaModule { }
