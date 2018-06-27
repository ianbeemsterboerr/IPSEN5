import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../../../shared/model/match";
import {Tournament} from "../../../../shared/model/tournament";
import {ActivatedRoute} from "@angular/router";
import {TournamentService} from "../../../tournament.service";
import {ATournament} from "../../ATournament";
import {NgbModal, NgbActiveModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { MatchResultComponent } from '../../../../match-result/match-result.component';
import {TeamMember} from "../../../../shared/model/team_member";

@Component({
    selector: 'app-elimination',
    templateUrl: './fifa-elimination.component.html',
    styleUrls: ['./fifa-elimination.component.css']
})
export class FifaEliminationComponent extends ATournament implements OnInit {
    brackets = [];
    loadingFinished: boolean = false;

    matchesY: number[] = [];
    matchesX: number[] = [];

    match_width = 120;
    match_height = 50;
    match_font_size = this.match_height / 2 - 5;

    score_width = 30;

    bracket_width = 150;
    bracket_spacing = this.bracket_width - this.match_width;

    match_height_spacing = 20;

    tournament_height = 0;
    tournament_width = 0;

    constructor(private modalService: NgbModal, tournamentService: TournamentService) {
        super(tournamentService);
    }

    ngOnInit() {
        this.loadTournament()
    }

    loadTournament() {
        this.brackets = [];

        const finale: Match = this.findFinale(this.tournament.matches);
        const bracket = [finale];

        this.brackets.unshift(bracket);
        this.loadNextBracket(bracket);

        this.onTournamentLoaded();
        this.loadingFinished = true;
    }

    private loadNextBracket(last_bracket: Match[]) {
        let new_bracket = [];

        for (let match of last_bracket) {
            const matches = this.findMatchesWithParent(match);
            new_bracket = new_bracket.concat(matches);
        }

        if (new_bracket.length > 0) {
            this.brackets.unshift(new_bracket);
            this.loadNextBracket(new_bracket);
        }
    }

    private findMatchesWithParent(parent: Match) {
        const matches = [];

        for (let match of this.tournament.matches)
            if (match.parent_match_id == parent.id)
                matches.push(match);

        return matches;
    }

    private findFinale(matches: Match[]) {
        for (let match of matches)
            if (match.parent_match_id == null)
                return match;

        return null;
    }

    onTournamentLoaded() {
        this.tournament_width = this.bracket_width * this.brackets.length;

        for (let bracket of this.brackets) {
            this.tournament_height = Math.max((this.match_height + this.match_height_spacing) * bracket.length, this.tournament_height);
        }

        for (let bracket of this.brackets) {
            for (let match of bracket) {
                this.matchesX[match.id] = this.getMatchXPosition(match, bracket);
                this.matchesY[match.id] = this.getMatchYPosition(match, bracket);
            }
        }
    }

    getNextBracket(bracket) {
        const current_index = this.brackets.indexOf(bracket);

        if (current_index == this.brackets.length - 1)
            return null;

        return this.brackets[current_index + 1];
    }

    isNextBracketBigger(bracket): boolean {
        const nextBracket = this.getNextBracket(bracket);

        if (nextBracket == null)
            return false;

        return bracket.length <= nextBracket.length;
    }

    getMatchById(id: number) {
        for (let match of this.tournament.matches)
            if (match.id == id)
                return match;

        return null;
    }

    getMatchXPosition(match: Match, bracket) {
        return this.brackets.indexOf(bracket) * this.bracket_width;
    }

    getMatchYPosition(match: Match, bracket) {
        if (!this.isNextBracketBigger(bracket)) {
            const availableSpace = this.tournament_height - bracket.length * this.match_height;
            const spacing = availableSpace / bracket.length;
            const index = bracket.indexOf(match);
            return index * this.match_height + index * spacing + spacing / 2;
        }

        const nextBracket = this.getNextBracket(bracket);
        const nextMatch = this.getMatchById(match.parent_match_id);

        return this.getMatchYPosition(nextMatch, nextBracket)
    }

    generatePointString(matchA: number, matchB: number) {
        const a = (this.matchesX[matchA] + this.match_width) + ', ' + (this.matchesY[matchA] + this.match_height / 2);
        const b = (this.matchesX[matchA] + this.match_width + this.bracket_spacing / 2) + ', ' + (this.matchesY[matchA] + this.match_height / 2);
        const c = (this.matchesX[matchB] - this.bracket_spacing / 2) + ', ' + (this.matchesY[matchB] + this.match_height / 2);
        const d = (this.matchesX[matchB]) + ', ' + (this.matchesY[matchB] + this.match_height / 2);

        return `${a}, ${b}, ${c}, ${d}`;
    }

    findMatchByID(id: number): Match {
        for (let match of this.tournament.matches)
            if (match.id == id)
                return match;

        return null;
    }

    matchClicked(match: Match) {
        const parentMatch = this.findMatchByID(match.parent_match_id);

        if (parentMatch != null && parentMatch.opponents.length >= 2) {
            if (!confirm("WARNING: Entering score for this match will reset progress to all linked matches.")) return;
        }

        if(match.opponents.length > 1 && localStorage.getItem('activeUserId')!=null){
            const modalRef = this.modalService.open(MatchResultComponent);
            modalRef.componentInstance.match = match;
            modalRef.componentInstance.tournament = this;
        }
    }

    isMatchActive(match: Match): boolean {
        if (match.opponents.length < 2) {
            return false;
        }

        for (let opponent of match.opponents) {
            if (opponent.result.score != 0) {
                return false;
            }
        }

        return true;
    }

    filterActiveMatches() {
        return this.tournament.matches.filter(match => this.isMatchActive(match))
    }

    getTeamMembers(id: number): TeamMember[] {
        for (let enrollment of this.tournament.enrollments) {
            if (enrollment.team_id == id) {
                return enrollment.team.team_members;
            }
        }

        return [];
    }

    onUpdate(tournament: Tournament): void {
        this.tournament = tournament;
        this.loadTournament();
    }
}
