import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home/home.component';
import {TournamentHomeComponent} from './tournament/tournament-home/tournament-home.component';
import {TournamentNewComponent} from './tournament/tournament-new/tournament-new.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { CreateaccountComponent } from './createaccount/createaccount.component';
import {EliminationComponent} from "./tournament/elimination/elimination.component";



const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent},
  { path: 'forgotpassword', component: ForgotpasswordComponent},
  { path: 'createaccount', component: CreateaccountComponent},
  { path: 'tournament/:id', component: EliminationComponent},
  { path: 'tournamentHome', component: TournamentHomeComponent },
  { path: 'tournamentNew', component: TournamentNewComponent}

];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
