import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

// Firebase
import { AngularFireAuth } from '@angular/fire/auth';

// Models
import { User } from '../models/user.model';

@Injectable({
    providedIn: 'root'
})

export class AuthService {

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router
    ) { }

    /**
     * @method login
     *
     * @description Method that will be used to login users with email and password
     *
     * @param email string type
     * @param password string type
     */
    login(user: User): Promise<any> {
        return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
    }

    /**
     * @method isLoggedIn
     *
     * @description Method that will be used to know if the users are logged in
     */
    isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return user !== null;
    }

    /**
     * @method logout
     *
     * @description Method that will be used to logout currently users
     */
    logout(): Promise<any> {
        localStorage.removeItem('user');
        this.router.navigate(['/home']);
        return this.afAuth.auth.signOut();
    }

    /**
     * @method isAuthenticatedUser
     *
     * @description
     */
    isAuthenticatedUser(): boolean {
        const expirationDate: number = Number(localStorage.getItem('expire'));
        const todayDate = new Date();

        if (expirationDate > todayDate.getTime()) {
            return true;
        } else {
            localStorage.setItem('user', null);
            localStorage.setItem('expire', null);
            return false;
        }
    }
}
