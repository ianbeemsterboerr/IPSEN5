import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {HttpModule} from "@angular/http";
import {ApiService} from "./api.service";

@NgModule({
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  declarations: [SidebarComponent],
  exports: [SidebarComponent]
})
export class SharedModule { }
