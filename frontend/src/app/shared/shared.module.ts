import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';

import {AngularFontAwesomeModule} from "angular-font-awesome";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from '@angular/router';
import {FormsModule} from "@angular/forms";
import { CountdownComponent } from './countdown/countdown.component';


@NgModule({
    declarations: [
        SidebarComponent,
        CountdownComponent
    ],
    imports: [
        CommonModule,
        AngularFontAwesomeModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ],
    exports: [SidebarComponent, CountdownComponent]
})
export class SharedModule {
}
