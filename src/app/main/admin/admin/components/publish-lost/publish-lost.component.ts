import * as _ from 'lodash';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { finalize } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';

// Models
import { LostCase } from 'src/app/models/lost.model';

// Angular firestore
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
    selector: 'app-publish-lost',
    templateUrl: './publish-lost.component.html',
    styleUrls: ['./../../admin.component.css']
})
export class PublishLostComponent implements OnInit, OnDestroy {

    public lostCase: LostCase;
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
            facebook: new FormControl(null, [
                Validators.required
            ]),
            whatsapp: new FormControl(null, [
                Validators.required
            ]),
            phoneReference: new FormControl(null, [
                Validators.required
            ]),
            description: new FormControl(null, [
                Validators.required
            ]),
            animalType: new FormControl(null, [
                Validators.required
            ]),
            mainImage: new FormControl(null, [
                Validators.required
            ]),
            lostDate: new FormControl({ value: null, disabled: false }, [
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
                const lostCaseDetails = this.db.collection('lost_cases').doc(this.docId);
                lostCaseDetails.get().toPromise()
                    .then(resp => {
                        console.log(resp.data());
                        this.lostCase = resp.data();
                        this.patchFormValue();
                    }).catch(err => {
                        Swal.fire({
                            allowOutsideClick: false,
                            icon: 'error',
                            text: 'Ocurrió un error al intentar traer los datos, intentalo nuevamente!'
                        });
                        console.error(err);
                    });
            }
        });
    }

    ngOnDestroy(): void {
        this.queryParamsSubscription.unsubscribe();
    }

    /**
     * @method patchFormValue
     * @description Method that will be patch the form with the lost case values
     */
    private patchFormValue(): void {
        const lostCase = this.lostCase;

        if (!_.isNil(lostCase)) {
            this.form.patchValue({
                name: lostCase.name,
                age: lostCase.age,
                description: lostCase.description,
                mainImage: lostCase.mainImage,
                animalType: lostCase.animalType,
                typeAge: lostCase.typeAge,
                facebook: lostCase.facebook,
                whatsapp: lostCase.whatsapp,
                phoneReference: lostCase.phoneReference,
                lostDate: new Date(lostCase.lostDate)
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
            console.log(parsedLoadEventTarget);
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
        const lostCase: LostCase = this.form.value;
        lostCase.lostDate = new Date(this.form.value.lostDate).getTime();
        // Upload image to firebase storage
        if (!this.editMode) {
            const randomId = Math.random().toString(36).substring(2);
            const storagePath = `photos/lost/${lostCase.name}_${randomId}`;
            lostCase.createdAt = new Date().getTime();
            lostCase.pathImage = storagePath;
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
                    lostCase.mainImage = url;
                    this.db.collection('lost_cases').add(lostCase)
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
                                !swalResp.value ? this.router.navigate(['admin/editar/perdido', resp.id]) : this.router.navigate(['perdido', lostCase.name, resp.id]);
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
            if (this.selectedFile) {
                const storagePath = this.lostCase.pathImage;
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
                        lostCase.mainImage = url;
                        this.db.collection('lost_cases').doc(this.docId).update(lostCase)
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
                this.db.collection('lost_cases').doc(this.docId).update(lostCase)
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
        this.lostCase.mainImage = undefined;
    }
}
