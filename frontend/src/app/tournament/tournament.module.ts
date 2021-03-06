import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FifaEliminationComponent} from './tournament-overviews/fifa/elimination/fifa-elimination.component';
import {SharedModule} from '../shared/shared.module';
import {ApiService} from '../shared/api.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AngularFontAwesomeModule} from 'angular-font-awesome';
import {TournamentNewComponent} from './tournament-new/tournament-new.component';
import {TournamentHomeComponent} from './tournament-home/tournament-home.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TournamentComponent } from './tournament/tournament.component';
import {TournamentService} from './tournament.service';
import { TournamentOverviewComponent } from './tournament-overviews/tournament-overview/tournament-overview.component';
import {TournamentDirective} from './tournament-directive';
import { MatchResultComponent } from '../match-result/match-result.component';
import { AcceptinviteComponent } from './invite/acceptinvite/acceptinvite.component';
import { PoulesComponent } from './tournament-overviews/fifa/poules/poules.component';

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
        FifaEliminationComponent,
        TournamentDirective,
        TournamentHomeComponent,
        TournamentNewComponent,
        TournamentComponent,
        TournamentOverviewComponent,
        AcceptinviteComponent,
        PoulesComponent
    ],
    providers: [ApiService, TournamentService],
    entryComponents: [
        FifaEliminationComponent,
        MatchResultComponent,
        PoulesComponent
    ]
})
export class TournamentModule {
}
