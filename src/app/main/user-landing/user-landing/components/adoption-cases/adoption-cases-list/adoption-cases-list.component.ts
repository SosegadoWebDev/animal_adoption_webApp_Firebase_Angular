import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Services
import { CasesService } from 'src/app/services/cases.service';

// Models
import { AdoptionCase } from 'src/app/models/adoption.model';

@Component({
    selector: 'app-adoption-cases-list',
    templateUrl: './adoption-cases-list.component.html',
    styleUrls: ['./adoption-cases-list.component.css']
})
export class AdoptionCasesListComponent implements OnInit, OnDestroy {

    private adoptionListSubscription: Subscription;
    public adoptionList: Array<AdoptionCase>;

    constructor(
        private casesS: CasesService
    ) { }

    ngOnInit() {
        this.adoptionListSubscription = this.casesS.getAdoptionCasesList().subscribe(resp => {
            this.adoptionList = resp;
            console.log(this.adoptionList);
        }, ((err) => {
            console.log(err);
        }), () => {
            console.log('finished adoption list');
        });
    }

    ngOnDestroy(): void {
        this.adoptionListSubscription.unsubscribe();
    }
}
