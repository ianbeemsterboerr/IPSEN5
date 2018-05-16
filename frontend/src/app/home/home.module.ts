import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {CalendarModule} from "angular-calendar";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { }
