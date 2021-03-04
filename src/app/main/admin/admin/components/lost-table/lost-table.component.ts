import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LostCase } from 'src/app/models/lost.model';

// App Services
import { CasesService } from 'src/app/services/cases.service';

@Component({
    selector: 'app-lost-table',
    templateUrl: './lost-table.component.html',
    styleUrls: ['./lost-table.component.css']
})
export class LostTableComponent implements OnInit, OnDestroy {

    public displayedColumns: string[] = ['name', 'animalType', 'lostDate', 'description','actions'];
    public isLoading: boolean;
    private lostListSubscription: Subscription;
    public lostList: Array<LostCase>;
    public dataSource: Array<LostCase>;

    constructor(
        private casesS: CasesService
    ) { 
        this.isLoading = false;
    }

    ngOnInit() {
        this.getLostListCases();
    }

    ngOnDestroy(): void {
        this.lostListSubscription.unsubscribe();
    }

    private getLostListCases(): void {
        this.isLoading = true;
        this.lostListSubscription = this.casesS.getLostCasesList().subscribe(resp => {
            this.lostList = resp;
            this.dataSource = resp;
            console.log(this.lostList);
        },
            ((err) => console.log(err)),
            () => this.isLoading = false);
    }
}
