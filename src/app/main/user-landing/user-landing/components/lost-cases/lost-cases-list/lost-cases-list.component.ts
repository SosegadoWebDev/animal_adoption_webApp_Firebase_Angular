import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { CasesService } from 'src/app/services/cases.service';

@Component({
    selector: 'app-lost-cases-list',
    templateUrl: './lost-cases-list.component.html',
    styleUrls: ['./lost-cases-list.component.css']
})
export class LostCasesListComponent implements OnInit, OnDestroy {

    private lostListSubscription: Subscription;

    constructor(
        private cService: CasesService
    ) { }

    ngOnInit() {
        this.lostListSubscription = this.cService.getLostCasesList().subscribe(
            resp => {
                console.log(resp);
            }, ((err) => {
                console.log(err);
            }), () => {
                console.log('finished lost list');
            }
        );
    }

    ngOnDestroy(): void {
        this.lostListSubscription.unsubscribe();
    }
}
