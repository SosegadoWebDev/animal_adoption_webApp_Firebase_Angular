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
}
