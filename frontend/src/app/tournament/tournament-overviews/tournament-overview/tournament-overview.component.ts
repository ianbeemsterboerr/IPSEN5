import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {FifaEliminationComponent} from "../fifa/elimination/fifa-elimination.component";
import {TournamentDirective} from "../../tournament-directive";
import {ATournament} from "../ATournament";
import {TournamentService} from "../../tournament.service";
import {ActivatedRoute} from "@angular/router";
import {Tournament} from "../../../shared/model/tournament";

@Component({
    selector: 'app-tournament-overview',
    template: '<ng-template overview-host></ng-template>'
})
export class TournamentOverviewComponent implements OnInit {

    @ViewChild(TournamentDirective) tournamentHost: TournamentDirective;

    private components = {
        'Fifa': {
            'Single elimination': FifaEliminationComponent,
        }
    };

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private tournamentService: TournamentService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = +params['id'];

            this.tournamentService.getTournament(id).subscribe(
                tournament => {
                    this.loadTournament(tournament);
                },
                error => {/*todo: resolve error case*/
                },
                () => {
                }
            )
        });
    }

    loadTournament(tournament: Tournament) {
        const component = this.components[tournament.gamename][tournament.tournament_typename];
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

        const componentRef = this.tournamentHost.viewContainerRef.createComponent(componentFactory);
        (<ATournament>componentRef.instance).tournament = tournament;
    }

}
