import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Angular material
import {
    MatDialogRef,
    MAT_DIALOG_DATA
} from '@angular/material';

// Services
import { AuthService } from '../auth.service';

// Models
import { User } from './../../models/user.model';

@Component({
    selector: 'app-auth-dialog',
    templateUrl: './auth-dialog.component.html',
    styleUrls: ['./auth-dialog.component.css']
})

export class AuthDialogComponent {

    public currentUser: User;

    constructor(
        public dialogRef: MatDialogRef<AuthDialogComponent>,
        private auths: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.currentUser = new User();
    }

    /**
     * @method authLogin
     *
     * @description Method that will log the user, calls to the login service
     */
    authLogin(): boolean {
        if (!(this.currentUser.password && this.currentUser.email)) {
            return false;
        }
        this.auths.login(this.currentUser, this.dialogRef);
    }
}
