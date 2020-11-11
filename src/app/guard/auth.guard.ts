import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';

// Services
import { AuthService } from '../auth/auth.service';

@Injectable({
    providedIn: 'root'
})

export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService
    ) { }

    canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        if (this.authService.isAuthenticatedUser()) {
            return true;
        } else {
            this.authService.logout();
            Swal.fire({
                allowOutsideClick: false,
                icon: 'warning',
                text: 'Vuelve a iniciar sesión por favor!'
            });
            return false;
        }
    }
}
