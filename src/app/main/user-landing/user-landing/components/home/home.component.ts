import * as _ from 'lodash';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

// Services
import { CasesService } from 'src/app/services/cases.service';

// Models
import { AdoptionCase } from 'src/app/models/adoption.model';
import { LostCase } from 'src/app/models/lost.model';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    @ViewChild('homeVideo', { static: false }) homeVideo: ElementRef;

    public adoptionCases: Array<AdoptionCase>;
    public lostCases: Array<LostCase>;
    public ageString: String;
    public isLoading: boolean;

    constructor(
        private _cases: CasesService
    ) {
        this.adoptionCases = [];
        this.lostCases = [];
        this.isLoading = false;
    }

    ngOnInit() {
        this.isLoading = true;

        Promise.all([this._cases.getAdoptionCasesHomeComponent().toPromise(), this._cases.getLostCasesHomeComponent().toPromise()])
            .then(([adoptionCases, lostCases]) => {
                for (let doc of adoptionCases.docs) {
                    this.adoptionCases.push(doc.data())
                }

                for (let doc of lostCases.docs) {
                    this.lostCases.push(doc.data())
                }

                _.each(this.adoptionCases, (adoptionCase: AdoptionCase) => {
                    switch (adoptionCase.typeAge) {
                        case 'MONTH':
                            adoptionCase['ageString'] = `${adoptionCase.age} ${adoptionCase.age === 1 ? 'Mes' : 'Meses'}`
                            break;
                        case 'AGE':
                            adoptionCase['ageString'] = `${adoptionCase.age} ${adoptionCase.age === 1 ? 'Año' : 'Años'}`
                            break;
                    }
                })

                console.log(this.adoptionCases, this.lostCases);
            })
            .finally(() => {
                this.isLoading = false;
                setTimeout(() => {
                    this.homeVideo.nativeElement.muted = true;
                }, 0);
            });
    }

    ngAfterViewInit(): void {
        // this.homeVideo.nativeElement.muted = true;
    }

    /**
    * @method onWhatsappNavigation
    * 
    * @description 
    * Redirect in a new windown tab to whatsapp messanger
    */
    public onWhatsappNavigation(caseItem: AdoptionCase): void {
        window.open(`https://api.whatsapp.com/send?phone=591${caseItem.phoneReference}&text=Me%20interesa%20pedir%20información%20sobre%20un%20animalito.`, '_blank');
    }
}
