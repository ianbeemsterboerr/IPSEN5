import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';


import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentNewComponent } from './tournament/tournament-new/tournament-new.component';

import { HttpClientModule } from '@angular/common/http';

import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {SharedModule} from "./shared/shared.module";
import {FormsModule} from "@angular/forms";
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {TournamentModule} from "./tournament/tournament.module";



@NgModule({
  declarations: [
    AppComponent,
    TournamentHomeComponent,
    TournamentNewComponent,
    LoginComponent,
    CreateaccountComponent,
    ForgotpasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule,
    HttpClientModule,

    TournamentModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
