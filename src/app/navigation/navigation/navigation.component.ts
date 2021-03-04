import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

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
export class HeaderComponent {

    public isLoggingAuthenticated: boolean;
    public isMobileMenuClicked: boolean;
    private bodyTag: HTMLElement = document.querySelector('body');
    private userData: any;

    constructor(
        public dialog: MatDialog,
        private auths: AuthService,
        private afAuth: AngularFireAuth,
    ) {
        this.afAuth.authState.subscribe((resp) => {
            this.userData = resp;
        });
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
     * @description 
     * Logout method, calls to checkAuthenticatedUser()
     */
    logout(): void {
        this.auths.logout();
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

    /**
     * @method onLinkItemClicked
     */
    public onLinkItemClicked(sidenav): void {
        sidenav.close();
    }
}
