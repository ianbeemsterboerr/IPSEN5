import {Component, ComponentFactoryResolver, ComponentRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FifaEliminationComponent} from '../fifa/elimination/fifa-elimination.component';
import {TournamentDirective} from '../../tournament-directive';
import {ATournament} from '../ATournament';
import {TournamentService} from '../../tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tournament} from '../../../shared/model/tournament';
import {ToastrService} from "ngx-toastr";
import {PoulesComponent} from '../fifa/poules/poules.component';
import {ErrorhandlerService} from "../../../shared/errorhandler.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-tournament-overview',
    templateUrl: './tournament-overview.component.html',
    styles: ['#shuffleBtn { color: #888888; background-color: #2e2e2e;}']
})
export class TournamentOverviewComponent implements OnInit, OnDestroy {

    @ViewChild(TournamentDirective) tournamentHost: TournamentDirective;

    private components = {
        'Fifa': {
            'Single elimination': FifaEliminationComponent,
            'Poules': PoulesComponent
        }
    };

    public id: number;
    public isOrganiser: boolean;

    private updateTimerSubscription: Subscription;

    private tournamentComponent: ComponentRef<ATournament>;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private tournamentService: TournamentService,
        private route: ActivatedRoute,
        private errorHandler: ErrorhandlerService
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.id  = +params['id'];
        });

        this.tournamentService.getTournament(this.id).subscribe(
            tournament => {
                this.isOrganiser = localStorage.getItem('activeUserId') === tournament.organizer_user_id.toString();
                this.loadTournament(tournament);
            },
            error => {this.errorHandler.handleError(error)}
        );

        this.updateTimerSubscription = Observable.interval(10000).subscribe(() => {this.update()});
    }

    ngOnDestroy(): void {
        this.updateTimerSubscription.unsubscribe();
    }

    update() {
        this.tournamentComponent.instance.update();
    }

    loadTournament(tournament: Tournament) {
        const component = this.components[tournament.gamename][tournament.tournament_typename];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory<ATournament>(component);

        this.tournamentComponent = this.tournamentHost.viewContainerRef.createComponent<ATournament>(componentFactory);
        this.tournamentComponent.instance.tournament = tournament;
    }

    shuffle() {
        if (confirm('WARNING: All progress will be lost and teams will be reshuffled!!')) {
            console.log('Shuffling...')
            this.tournamentService.startTournament(this.id).subscribe(
                next => {
                  console.log('Shuffled.');
                  this.tournamentComponent.instance.update();
                },
                error => { /*todo: */ }
            );
        }
    }
}
