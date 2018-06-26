import {Component, ComponentFactoryResolver, ComponentRef, Input, OnInit, ViewChild} from '@angular/core';
import {FifaEliminationComponent} from '../fifa/elimination/fifa-elimination.component';
import {TournamentDirective} from '../../tournament-directive';
import {ATournament} from '../ATournament';
import {TournamentService} from '../../tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tournament} from '../../../shared/model/tournament';
import {ToastrService} from 'ngx-toastr';
import {ErrorhandlerService} from '../../../shared/errorhandler.service';
import {PoulesComponent} from '../fifa/poules/poules.component';

@Component({
    selector: 'app-tournament-overview',
    templateUrl: './tournament-overview.component.html',
    styles: ['#shuffleBtn { color: #888888; background-color: #2e2e2e;}']
})
export class TournamentOverviewComponent implements OnInit {

    @ViewChild(TournamentDirective) tournamentHost: TournamentDirective;

    private components = {
        'Fifa': {
            'Single elimination': FifaEliminationComponent,
            'Poules': PoulesComponent
        }
    };

    public id: number;
    public isOrganiser: boolean;

    private tournamentComponent: ComponentRef<ATournament>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private tournamentService: TournamentService,
        private route: ActivatedRoute,
        private router: Router,
        private toast: ToastrService,
        private errorHandler: ErrorhandlerService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];
            this.id = id;

            this.tournamentService.getTournament(id).subscribe(
                tournament => {
                    this.isOrganiser = localStorage.getItem('activeUserId') === tournament.organizer_user_id.toString();
                    this.loadTournament(tournament);
                },
                error => {/*todo: resolve error case*/
                },
                () => {
                }
            );
        });
    }

    loadTournament(tournament: Tournament) {
        const component = this.components[tournament.gamename][tournament.tournament_typename];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<ATournament>(component);

        this.tournamentComponent = this.tournamentHost.viewContainerRef.createComponent<ATournament>(componentFactory);
        this.tournamentComponent.instance.tournament = tournament;
    }

    shuffle() {
        if (confirm('WARNING: All progress will be lost and teams will be reshuffled!!')) {
            console.log('Shuffling...');
            this.tournamentService.startTournament(this.id).subscribe(
                next => { this.tournamentComponent.instance.update(); },
                error => { this.errorHandler.handleError(error); }
            );
        }
    }
}
