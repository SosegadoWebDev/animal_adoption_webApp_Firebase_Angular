import { Component, OnInit } from '@angular/core';

// Angular fire
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

// Models
import { AdoptionCase } from 'src/app/models/adoption.model';

@Component({
    selector: 'app-adoption-cases-details',
    templateUrl: './adoption-cases-details.component.html',
    styleUrls: ['./adoption-cases-details.component.css']
})
export class AdoptionCasesDetailsComponent implements OnInit {

    constructor(
        private db: AngularFirestore
    ) { }

    ngOnInit() {
        // const adoptionDetails = this.afs.collection('publish_cases', ref => ref.where('id', '==', '8sQxHuUwdOJ771ndyNm2')).snapshotChanges();
        const adoptionDetails = this.db.collection('publish_cases').doc('V69DKrpuyRFR7ZOageOm');
        adoptionDetails.get().toPromise()
            .then(resp => {
                console.log(resp.data());
            }).catch(error => {
                console.log(error);
            });

        // Creating a publish_cases item in a specific document and passing an object with set method

        // this.afs.collection('publish_cases').doc('test').set({
        //     test: 'testing cloud functions methods',
        //     type: 'query collections'
        // });
    }
}
