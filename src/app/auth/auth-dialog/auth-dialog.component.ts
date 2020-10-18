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

export class AuthDialogComponent implements OnInit {

    public currentUser: User;

    constructor(
        public dialogRef: MatDialogRef<AuthDialogComponent>,
        private auths: AuthService,
        private router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any) {

        this.currentUser = new User();
    }

    ngOnInit() { }

    /**
     * @method onNoClick
     *
     * @emits dialogRef.close()
     */
    onNoClick(): void {
        this.dialogRef.close();
    }

    /**
     * @method authLogin
     *
     * @description Method that will log the user, calls to the login service
     *
     */
    authLogin(): boolean {
        console.log('asdsad')
        if (!(this.currentUser.password && this.currentUser.email)) {
            return false;
        }

        const today = new Date();
        today.setSeconds(3600);

        Swal.fire({
            allowOutsideClick: false,
            icon: 'info',
            text: 'Iniciando sesión'
        });
        Swal.showLoading();
        this.auths.login(this.currentUser)
            .then((resp) => {
                console.log(resp);
                localStorage.setItem('user', JSON.stringify(resp.user));
                localStorage.setItem('expire', today.getTime().toString());
                this.dialogRef.close();
                Swal.fire({
                    icon: 'success',
                    text: 'Iniciaste sesión con éxito!'
                });
                this.router.navigate(['/admin/publicar']);
            })
            .catch((err) => {
                console.log(err);
                let errorMessage: string;

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
}
