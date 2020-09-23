import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private auths: AuthService,
        private router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        // console.log(this.auths.isLoggedIn(), this.auths.isAuthenticatedUser());

        if (this.auths.isLoggedIn() && this.auths.isAuthenticatedUser()) {
            return true;
        } else {
            this.router.navigateByUrl('/home');
            this.auths.logout();
            Swal.fire({
                allowOutsideClick: false,
                icon: 'error',
                text: 'Debes iniciar sesión!'
            });

            return false;
        }
    }
}
