import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from '../shared/api.service';
import { Match } from '../shared/model/match';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from "ngx-toastr";
import {ATournament} from "../tournament/tournament-overviews/ATournament";

@Component({
  selector: 'app-match-result',
  templateUrl: './match-result.component.html'
})

export class MatchResultComponent implements OnInit {
  @Input() match: Match;
  @Input() tournament: ATournament;

  constructor(private api: ApiService, public activeModal : NgbActiveModal, private toastr: ToastrService) { }

  ngOnInit() {  
  }

  sendResults(match, activeModal){
    this.api.post('tournament/score', match).subscribe(
      succes => {
          this.toastr.success("Score updated");
          activeModal.close('score submitted');

          this.tournament.update();
      },
      failure => {
          this.toastr.error("Zie console.");
      }
   );
  }

  

}
