import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {D} from "@angular/core/src/render3";
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'app-countdown',
    templateUrl: './countdown.component.html',
    styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
    @Input() target_date: Date;
    private counter: Observable<number>;

    private counterSubscription: Subscription;

    public hours: number;
    public minutes: number;
    public seconds: number;

    constructor() {
    }

    update(time: number) {
        this.hours = Math.floor(time / 3600);
        time -= this.hours * 3600;
        this.minutes = Math.floor(time / 60) % 60;
        time -= this.minutes * 60;
        this.seconds = time % 60;
    }

    ngOnInit() {
        this.target_date = new Date(this.target_date);

        this.counter = Observable.interval(1000).map(
            (x) => this.timeDifference()
        );

        this.counterSubscription = this.counter.subscribe((x) => this.update(x))

        this.update(this.timeDifference());
    }

    ngOnDestroy() {
        this.counterSubscription.unsubscribe();
    }

    private timeDifference(): number {
        return Math.floor((this.target_date.getTime() - new Date().getTime()) / 1000);
    }

}
