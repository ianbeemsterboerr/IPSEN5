
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PasswordEqualValidator } from './shared/passwordconfirmation.directive';

import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';
import { MatchResultComponent } from './match-result/match-result.component';

import {JwtInterceptor} from './interceptors/jwt-interceptor';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {CreateaccountComponent} from './createaccount/createaccount.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {TournamentModule} from './tournament/tournament.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ToastrModule} from 'ngx-toastr';
import { UserService } from './shared/user.service';
import {RouterModule} from '@angular/router';
import {ApiService} from './shared/api.service';


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
    providers: [
        ApiService,
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
