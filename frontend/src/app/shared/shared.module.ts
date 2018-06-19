import { ErrorhandlerService } from './errorhandler.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SidebarComponent} from './sidebar/sidebar.component';

import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { CountdownComponent } from './countdown/countdown.component';
import { SearchPipe } from './search.pipe';



@NgModule({
    declarations: [
        SidebarComponent,
        CountdownComponent,
        SearchPipe
    ],
    imports: [
        CommonModule,
        AngularFontAwesomeModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ],
    providers: [
      ErrorhandlerService
    ],
    exports: [SidebarComponent, CountdownComponent, SearchPipe]
})
export class SharedModule {
}
