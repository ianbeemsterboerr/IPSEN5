import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {MatchResultComponent} from "./match-result/match-result.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'invoer', component: MatchResultComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  declarations: [],
  exports: [ RouterModule ]
})
export class AppRoutingModule {

}
