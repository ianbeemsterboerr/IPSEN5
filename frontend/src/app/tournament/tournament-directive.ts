import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[overview-host]'
})
export class TournamentDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
