import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

// Models
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    public isUserLogged: boolean;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) {
        this.isUserLogged = !!JSON.parse(localStorage.getItem('user')) ? true : false;
    }

    /**
     * @method login
     *
     * @description Method that will be used to login users with email and password
     *
     * @param email string type
     * @param password string type
     */
    login(user: User, authDialog?): void {
        const today = new Date();
        today.setSeconds(3600);
        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Iniciando sesión'
        });
        Swal.showLoading();
        this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then((resp) => {
                this.isUserLogged = true;
                localStorage.setItem('user', JSON.stringify(resp.user.email));
                localStorage.setItem('expire', today.toISOString());
                authDialog.close();
                Swal.fire({
                    icon: 'success',
                    text: 'Iniciaste sesión con éxito!'
                });
                this.router.navigate(['/admin/panel']);
            })
            .catch((err) => {
                console.log(err);
                let errorMessage: string;
                this.isUserLogged = false;

                if (err.code === 'auth/wrong-password') {
                    errorMessage = 'La contraseña es inválida o tu usuario no posee contraseña.';
                } else if (err.code === 'auth/user-not-found') {
                    errorMessage = 'Usuario no encontrado, probablemente escribiste mal el email.';
                } else if (err.code === 'auth/invalid-email') {
                    errorMessage = 'Email inválido, escribe un email correcto.';
                }

                Swal.fire({
                    icon: 'error',
                    title: 'Error al autenticar usuario',
                    text: errorMessage
                });
            });
    }

    /**
     * @method logout
     *
     * @description Method that will be used to logout currently users
     */
    public logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('expire');
        this.isUserLogged = false;
        this.router.navigate(['/home']);
        Swal.fire({
            allowOutsideClick: false,
            icon: 'success',
            text: 'Cerraste sesión!'
        });
        this.afAuth.auth.signOut();
    }

    /**
     * @method isAuthenticatedUser
     *
     * @description
     */
    public isAuthenticatedUser(): boolean {
        const expirationDate = localStorage.getItem('expire');
        const todayDate = new Date();
        const user = JSON.parse(localStorage.getItem('user'));

        if (new Date(expirationDate).getTime() > todayDate.getTime() && user) {
            return true;
        } else {
            localStorage.removeItem('user');
            localStorage.removeItem('expire');
            return false;
        }
    }
}
