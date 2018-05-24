import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EliminationComponent} from './elimination/elimination.component';
import {SharedModule} from "../shared/shared.module";
import {ApiService} from "../shared/api.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {AngularFontAwesomeModule} from "angular-font-awesome";
import {TournamentNewComponent} from "./tournament-new/tournament-new.component";
import {TournamentHomeComponent} from "./tournament-home/tournament-home.component";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        AngularFontAwesomeModule,
        RouterModule
    ],
    declarations: [
        EliminationComponent,
        TournamentHomeComponent,
        TournamentNewComponent],
    providers: [ApiService]
})
export class TournamentModule {
}
