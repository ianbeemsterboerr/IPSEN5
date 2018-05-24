import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EliminationComponent } from './elimination/elimination.component';
import {SharedModule} from "../shared/shared.module";
import {ApiService} from "../shared/api.service";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
      NgbModule
  ],
  declarations: [EliminationComponent],
  providers: [ApiService]
})
export class TournamentModule { }
