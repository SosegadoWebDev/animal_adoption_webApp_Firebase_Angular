import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

// Models
import { AdoptionCase } from 'src/app/models/adoption.model';

// App Services
import { CasesService } from 'src/app/services/cases.service';

@Component({
    selector: 'app-adoption-table',
    templateUrl: './adoption-table.component.html',
    styleUrls: ['./adoption-table.component.css']
})
export class AdoptionTableComponent implements OnInit, OnDestroy {

    public displayedColumns: string[] = ['name', 'animalType', 'created', 'caseType', 'actions'];
    public isLoading: boolean;
    private adoptionListSubscription: Subscription;
    public adoptionList: Array<AdoptionCase>;
    public dataSource: Array<AdoptionCase>;

    constructor(
        private casesS: CasesService
    ) {
        this.isLoading = false;
    }

    ngOnInit() {
        this.getAdoptionListCases();
    }

    ngOnDestroy(): void {
        this.adoptionListSubscription.unsubscribe();
    }

    private getAdoptionListCases(): void {
        this.isLoading = true;
        this.adoptionListSubscription = this.casesS.getAdoptionCasesList().subscribe(resp => {
            this.adoptionList = resp;
            this.dataSource = resp;
            console.log(this.adoptionList);
        },
            ((err) => console.log(err)),
            () => this.isLoading = false);
    }
}
