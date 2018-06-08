
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PasswordEqualValidator } from './shared/passwordconfirmation.directive';

import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentNewComponent } from './tournament/tournament-new/tournament-new.component';

import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';
import { MatchResultComponent } from './match-result/match-result.component';

import {JwtInterceptor} from './interceptors/jwt-interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {ApiService} from './services/api.service';
import {LoginComponent} from './login/login.component';
import {CreateaccountComponent} from './createaccount/createaccount.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {TournamentModule} from './tournament/tournament.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import { ActiveaccountService } from './services/activeaccount.service';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        AppComponent,
        MatchResultComponent,
        LoginComponent,
        CreateaccountComponent,
        ForgotpasswordComponent,
        PasswordEqualValidator
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        HomeModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        TournamentModule,
        NgbModule.forRoot(),
        ToastrModule.forRoot()
    ],
    providers: [ApiService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        },
        ActiveaccountService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
