import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    SidebarComponent
  ],
  imports: [
    CommonModule,
    AngularFontAwesomeModule,
    BrowserAnimationsModule
  ],
  exports: [SidebarComponent]
})
export class SharedModule { }
