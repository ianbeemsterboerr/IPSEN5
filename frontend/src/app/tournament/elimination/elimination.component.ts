import { Component, OnInit } from '@angular/core';
import {ApiService} from "../../shared/api.service";
import {Dummy_tournament} from "../../shared/model/dummy_tournament";
import {Match} from "../../shared/model/match";
import {Bracket} from "../../shared/model/bracket";

@Component({
  selector: 'app-elimination',
  templateUrl: './elimination.component.html',
  styleUrls: ['./elimination.component.css']
})
export class EliminationComponent implements OnInit {
  tournament: Dummy_tournament;

  matchesY: number[] =[];
  matchesX: number[] =[];

  match_width = 120;
  match_height = 50;
  match_font_size = this.match_height/2 - 5;

  score_width = 30;

  bracket_width = 150;
  bracket_spacing = this.bracket_width - this.match_width;

  match_height_spacing = 20;

  tournament_height = 0;
  tournament_width = 0;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get<Dummy_tournament>('tournament/dummy', {teams: 200}).subscribe(
      next=> {
        this.onTournamentLoaded(next);
        this.tournament = next;
      }
    )
  }

  onTournamentLoaded(tournament: Dummy_tournament) {
    this.tournament_width = this.bracket_width * tournament.brackets.length;

    for (let bracket of tournament.brackets) {
      this.tournament_height = Math.max((this.match_height + this.match_height_spacing) * bracket.matches.length, this.tournament_height);
    }
    for (let bracket of tournament.brackets) {
      for (let match of bracket.matches) {
        this.matchesX[match.matchID] = this.getMatchXPosition(match, bracket, tournament);
        this.matchesY[match.matchID] = this.getMatchYPosition(match, bracket, tournament);
      }
    }
  }

  getNextBracket(bracket: Bracket, tournament: Dummy_tournament) {
    const current_index = tournament.brackets.indexOf(bracket);

    if (current_index == tournament.brackets.length - 1) {
      return null;
    }

    return tournament.brackets[current_index + 1];
  }

  nextBracketBigger(bracket: Bracket, tournament: Dummy_tournament): boolean {
    const nextBracket = this.getNextBracket(bracket, tournament);

    if (nextBracket == null) {
      return false;
    }

    return bracket.matches.length < nextBracket.matches.length;
  }

  static getMatchByIdAndBracket(id: number, bracket: Bracket) {
    for (let match of bracket.matches) {
      if (match.matchID == id) {
        return match;
      }
    }

    return null;
  }

  getMatchXPosition(match: Match, bracket: Bracket, tournament: Dummy_tournament) {
    return tournament.brackets.indexOf(bracket) * this.bracket_width;
  }

  getMatchYPosition(match: Match, bracket: Bracket, tournament: Dummy_tournament) {
    if (!this.nextBracketBigger(bracket, tournament)) {
      const availableSpace = this.tournament_height - bracket.matches.length * this.match_height;
      const spacing = availableSpace / bracket.matches.length;
      const index = bracket.matches.indexOf(match);
      return index * this.match_height + index * spacing + spacing / 2;
    }

    const nextBracket = this.getNextBracket(bracket, tournament);
    const nextMatch = EliminationComponent.getMatchByIdAndBracket(match.nextMatch, nextBracket);

    return this.getMatchYPosition(nextMatch, nextBracket, tournament)
  }

  generatePointString(matchA: number, matchB: number) {
    const a = (this.matchesX[matchA] + this.match_width) + ', ' + (this.matchesY[matchA] + this.match_height/2) ;
    const b = (this.matchesX[matchA] + this.match_width + this.bracket_spacing/2) + ', ' + (this.matchesY[matchA] + this.match_height/2);
    const c = (this.matchesX[matchB] - this.bracket_spacing/2) + ', ' + (this.matchesY[matchB] + this.match_height/2);
    const d = (this.matchesX[matchB]) + ', ' + (this.matchesY[matchB] + this.match_height/2);

    return a + ', ' + b + ', ' + c + ', ' +  d;
  }
}
