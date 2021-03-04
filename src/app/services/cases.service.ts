import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';

// Services
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

// Models
import { LostCase } from './../models/lost.model';
import { AdoptionCase } from 'src/app/models/adoption.model';

@Injectable({
    providedIn: 'root'
})

export class CasesService {

    constructor(
        private afs: AngularFirestore
    ) { }

    /**
     * @method getAdoptionCasesList
     *
     * @description Get adoption cases list from firestore
     * @returns Observable
     */
    getAdoptionCasesList(): Observable<any> {
        return this.afs.collection<AdoptionCase>('publish_cases').snapshotChanges().pipe(
            map(items => {
                const arr = [];
                _.each(items, item => {
                    const data = item.payload.doc.data() as AdoptionCase;
                    const id = item.payload.doc.id;
                    arr.push({ ...data, id });
                });
                return arr;
            }), take(1));
    }

    /**
     * @method getAdoptionCasesHomeComponent
     * 
     * @description Get adoption cases list for home componente
     * @returns Observable
     */
    public getAdoptionCasesHomeComponent(): Observable<any> {
        return this.afs.collection('publish_cases', ref => ref.limit(4)).get();
    }

    /**
     * @method getAdoptionCasesHomeComponent
     * 
     * @description Get adoption cases list for home componente
     * @returns Observable
     */
    public getLostCasesHomeComponent(): Observable<any> {
        return this.afs.collection('lost_cases', ref => ref.limit(4)).get();
    }

    /**
     * @method getLostCasesList
     *
     * @description Get lost cases list from firestore
     * @returns Observable
     */
    getLostCasesList(): Observable<any> {
        return this.afs.collection<LostCase>('lost_cases').valueChanges().pipe(take(1));
    }
}
