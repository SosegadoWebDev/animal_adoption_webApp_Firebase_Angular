import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

// Models
import { AdoptionCase } from 'src/app/models/adoption.model';

// Angular firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-publish-adoption',
    templateUrl: './publish-adoption.component.html',
    styleUrls: ['./../../admin.component.css']
})
export class PublishAdoptionComponent implements OnInit, OnDestroy {

    public adoptionCase: AdoptionCase;
    public form: FormGroup;
    public selectedFile: File;
    public numberAge: number;
    public imageURLpreview: string;
    private queryParamsSubscription: Subscription;
    private editMode: boolean;
    private docId: string;

    constructor(
        private fb: FormBuilder,
        private db: AngularFirestore,
        private storage: AngularFireStorage,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.form = this.fb.group({
            name: new FormControl(null, [
                Validators.required
            ]),
            age: new FormControl(null, [
                Validators.required
            ]),
            typeAge: new FormControl(null, [
                Validators.required
            ]),
            description: new FormControl(null, [
                Validators.required
            ]),
            mainImage: new FormControl(null, [
                Validators.required
            ]),
            animalType: new FormControl(null, [
                Validators.required
            ]),
            phoneReference: new FormControl(null, [
                Validators.required
            ]),
            caseType: new FormControl(null, [
                Validators.required
            ])
        });
    }

    ngOnInit() {
        this.queryParamsSubscription = this.route.paramMap.subscribe((paramMap: ParamMap) => {
            if (paramMap.has('id')) {
                this.editMode = true;
                this.imageURLpreview = undefined;
                this.docId = paramMap.get('id');
                const adoptionDetails = this.db.collection('publish_cases').doc(this.docId);
                adoptionDetails.get().toPromise()
                    .then(resp => {
                        console.log(resp.data());
                        this.adoptionCase = resp.data();
                        this.patchFormValue();
                    }).catch(err => {
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'error',
                            text: 'Ocurrió un error al intentar traer los datos, intentalo nuevamente!'
                        });
                        console.log(err);
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }

    /**
     * @method patchFormValue
     * @description Method that will be patch the form with the adoption case values
     */
    private patchFormValue(): void {
        const adoption = this.adoptionCase;

        if (!_.isNil(adoption)) {
            this.form.patchValue({
                name: adoption.name,
                age: adoption.age,
                description: adoption.description,
                mainImage: adoption.mainImage,
                animalType: adoption.animalType,
                phoneReference: adoption.phoneReference,
                caseType: adoption.caseType,
                typeAge: adoption.typeAge
            });
        }
    }

    /**
     * @method onImagePicked
     * @description
     */
    onImagePicked(evt: any): void {
        this.selectedFile = evt.target.files[0];
        const target = (evt.target as HTMLInputElement);
        const reader = new FileReader();

        reader.onload = (loadEvent) => {
            const parsedLoadEventTarget = (loadEvent.target as any);
            this.imageURLpreview = parsedLoadEventTarget.result;
        };
        reader.readAsDataURL(target.files[0]);
    }

    /**
     * @method save
     * @description Submit method
     */
    save() {
        // Start loading
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Guardando...'
        });
        Swal.showLoading();
        const adoptionCase: AdoptionCase = this.form.value;
        // Upload image to firebase storage
        if (!this.editMode) {
            const randomId = Math.random().toString(36).substring(2);
            const storagePath = `photos/adoption/${adoptionCase.name}_${randomId}`;
            // Set a date for creation
            adoptionCase.createdAt = new Date().getTime();
            adoptionCase.pathImage = storagePath;
            const storageRef = this.storage.ref(storagePath);
            const uploadTask = this.storage.upload(storagePath, this.selectedFile);
            // Upload task progress
            uploadTask.percentageChanges().subscribe(progress => {
                // TODO handling progress function
                console.log(progress);
            });
            // Upload task url download
            uploadTask.snapshotChanges().pipe(finalize(() => {
                storageRef.getDownloadURL().subscribe(url => {
                    // Save call
                    adoptionCase.mainImage = url;
                    this.db.collection('publish_cases').add(adoptionCase)
                        .then(resp => {
                            Swal.fire({
                                title: 'Se creó correctamente la publicación',
                                icon: 'success',
                                text: '¿Deseas ver la publicación o editar la publicación?',
                                showConfirmButton: true,
                                showCancelButton: true,
                                showCloseButton: true,
                                confirmButtonText: 'Ver publicación',
                                cancelButtonText: 'Seguir editando'
                            }).then(swalResp => {
                                !swalResp.value ? this.router.navigate(['admin/editar/adopcion', resp.id]) : this.router.navigate(['adopcion', adoptionCase.name, resp.id]);
                            });
                        })
                        .catch((err) => {
                            Swal.fire({
                                allowOutsideClick: false,
                                icon: 'error',
                                text: 'Ocurrió un error, intentalo nuevamente!'
                            });
                            console.log(err);
                        });
                });
            })).subscribe();
        } else {
            // Set last update date
            adoptionCase.updatedAt = new Date().getTime();
            if (this.selectedFile) {
                const storagePath = this.adoptionCase.pathImage;
                const storageRef = this.storage.ref(storagePath);
                const uploadTask = this.storage.upload(storagePath, this.selectedFile);
                // Upload task progress
                uploadTask.percentageChanges().subscribe(progress => {
                    // TODO handling progress function
                    console.log(progress);
                });
                // Upload task url download
                uploadTask.snapshotChanges().pipe(finalize(() => {
                    storageRef.getDownloadURL().subscribe(url => {
                        // Save call
                        adoptionCase.mainImage = url;
                        this.db.collection('publish_cases').doc(this.docId).update(adoptionCase)
                            .then(() => {
                                Swal.fire({
                                    allowOutsideClick: false,
                                    icon: 'success',
                                    text: 'Se guardó correctamente!'
                                });
                                Swal.hideLoading();
                            })
                            .catch((err) => {
                                Swal.fire({
                                    allowOutsideClick: false,
                                    icon: 'error',
                                    text: 'Ocurrió un error, intentalo nuevamente!'
                                });
                                console.error(err);
                            });
                    });
                })).subscribe();
            } else {
                this.db.collection('publish_cases').doc(this.docId).update(adoptionCase)
                    .then(() => {
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'success',
                            text: 'Se guardó correctamente!'
                        });
                        Swal.hideLoading();
                    })
                    .catch((err) => {
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'error',
                            text: 'Ocurrió un error, intentalo nuevamente!'
                        });
                        console.error(err);
                    });
            }
        }
    }

    /**
     * @method onDeleteImage
     * @description Delete an image selected
     */
    onDeleteImage(): void {
        this.selectedFile = undefined;
        this.imageURLpreview = undefined;
        this.adoptionCase.mainImage = undefined;
    }
}
