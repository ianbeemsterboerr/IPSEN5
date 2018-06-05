import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {HomeComponent} from './home/home/home.component';
import {TournamentHomeComponent} from './tournament/tournament-home/tournament-home.component';
import {TournamentNewComponent} from './tournament/tournament-new/tournament-new.component';
import {LoginComponent} from './login/login.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';
import {CreateaccountComponent} from './createaccount/createaccount.component';
import {TournamentComponent} from "./tournament/tournament/tournament.component";
import {TournamentOverviewComponent} from "./tournament/tournament-overviews/tournament-overview/tournament-overview.component";


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'forgotpassword', component: ForgotpasswordComponent},
    {path: 'createaccount', component: CreateaccountComponent},
    {path: 'tournaments', component: TournamentHomeComponent},
    {path: 'tournaments/new', component: TournamentNewComponent},
    {path: 'tournaments/:id', component: TournamentComponent},
    {path: 'tournaments/overview/:id', component: TournamentOverviewComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    declarations: [],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
