import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {TournamentHomeComponent} from './tournament/tournament-home/tournament-home.component';
import {TournamentNewComponent} from './tournament/tournament-new/tournament-new.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
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
