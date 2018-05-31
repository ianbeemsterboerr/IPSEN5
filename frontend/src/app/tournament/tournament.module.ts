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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TournamentComponent } from './tournament/tournament.component';
import {TournamentService} from "./tournament.service";

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgbModule,
        AngularFontAwesomeModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        EliminationComponent,
        TournamentHomeComponent,
        TournamentNewComponent,
        TournamentComponent
    ],
    providers: [ApiService, TournamentService]
})
export class TournamentModule {
}
