import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeModule} from './home/home.module';
import {SharedModule} from './shared/shared.module';
import { TournamentHomeComponent } from './tournament/tournament-home/tournament-home.component';
import { TournamentNewComponent } from './tournament/tournament-new/tournament-new.component';


@NgModule({
  declarations: [
    AppComponent,
    TournamentHomeComponent,
    TournamentNewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
