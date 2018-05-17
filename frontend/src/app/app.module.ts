import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HomeModule} from "./home/home.module";
import {SharedModule} from "./shared/shared.module";

import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { LoginComponent } from './login/login.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';


@NgModule({
  declarations: [
    AppComponent,
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
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
