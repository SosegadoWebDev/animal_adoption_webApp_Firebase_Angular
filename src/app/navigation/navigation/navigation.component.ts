import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import Swal from 'sweetalert2';

// Angular material
import {
    MatDialog
} from '@angular/material';

// Components
import { AuthDialogComponent } from 'src/app/auth/auth-dialog/auth-dialog.component';

// Services
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.css']
})
export class HeaderComponent implements OnInit {

    public isLoggingAuthenticated: boolean;
    public isMobileMenuClicked: boolean;
    private bodyTag: HTMLElement = document.querySelector('body');

    constructor(
        public dialog: MatDialog,
        private auths: AuthService,
        private afAuth: AngularFireAuth,
    ) {
        this.afAuth.authState.subscribe(() => {
            this.isLoggingAuthenticated = this.checkAuthenticatedUser();
        });
    }

    ngOnInit() {
        // this.isLoggingAuthenticated = this.checkAuthenticatedUser();
    }

    /**
     * @method openLoginDialog
     */
    openLoginDialog(): void {
        this.dialog.open(AuthDialogComponent);
    }

    /**
     * @method logout
     *
     * @description Logout method, calls to checkAuthenticatedUser()
     */
    logout(): void {
        this.auths.logout().then(() => {
            Swal.fire({
                allowOutsideClick: false,
                icon: 'success',
                text: 'Cerraste sesión!'
            });
            this.isLoggingAuthenticated = this.checkAuthenticatedUser();
        });
    }

    /**
     * @method checkAuthenticatedUser
     *
     * @returns boolean
     */
    private checkAuthenticatedUser(): boolean {
        return this.auths.isLoggedIn() && this.auths.isAuthenticatedUser();
    }

    /**
     * @method onSidenavClosed
     */
    onSidenavClosed() {
        this.isMobileMenuClicked = false;
        this.bodyTag.style.overflow = 'auto';
    }

    /**
     * @method onSidenavChange
     */
    onSidenavChange(evt) {
        if (evt.opened) {
            evt.close();
            setTimeout(() => {
                this.isMobileMenuClicked = false;
            }, 400);
        } else {
            this.isMobileMenuClicked = true;
            evt.open();
            this.bodyTag.style.overflow = 'hidden';
        }
    }
}
