import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginModule } from './login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TurnoComponent } from './turno/turno.component';
import {MatCardModule} from "@angular/material/card";
import {TurnoModule} from "./turno/turno.module";
import {TrilhaModule} from "./trilha/trilha.module";

@NgModule({
  declarations: [AppComponent],
    imports: [BrowserModule, AppRoutingModule, LoginModule, TurnoModule, TrilhaModule, BrowserAnimationsModule, MatCardModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
