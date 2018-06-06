import {Component, ComponentFactoryResolver, Input, OnInit, ViewChild} from '@angular/core';
import {FifaEliminationComponent} from '../fifa/elimination/fifa-elimination.component';
import {TournamentDirective} from '../../tournament-directive';
import {ATournament} from '../ATournament';
import {TournamentService} from '../../tournament.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Tournament} from '../../../shared/model/tournament';

@Component({
  selector: 'app-tournament-overview',
  template: '<ng-template overview-host></ng-template>' +
  '<button id="shuffleBtn" class="btn-secondary offset-10" (click)="shuffle()" > Shuffle match-ups </button>',
  styles: ['#shuffleBtn { color: #888888; background-color: #2e2e2e;}']
})
export class TournamentOverviewComponent implements OnInit {

  @ViewChild(TournamentDirective) tournamentHost: TournamentDirective;

  private components = {
    'Fifa': {
      'Single elimination': FifaEliminationComponent,
    }
  };

  private id: number;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private tournamentService: TournamentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.id = id;

      this.tournamentService.getTournament(id).subscribe(
        tournament => {
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
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);

    const componentRef = this.tournamentHost.viewContainerRef.createComponent(componentFactory);
    (<ATournament>componentRef.instance).tournament = tournament;
  }

  shuffle() {
    const id = this.id;
    if (confirm('Generating a new bracket will reset any progress in te current bracket. The tournament' +
      'will be reset to a fresh bracket with different match-ups.')) {
      console.log('Reshuffling');
      // todo shuffle tournment
    }
  }

}
