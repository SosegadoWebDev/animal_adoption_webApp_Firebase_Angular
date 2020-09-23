import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular fire
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Angular material
import {
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatDialogModule
} from '@angular/material';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './navigation/navigation/navigation.component';

// Shared Module
import { SharedModule } from './shared/shared.module';

// Auth Module
import { AuthModule } from './auth/auth.module';

const firebaseConfig = {
    apiKey: 'AIzaSyC0-y_PYvTqT8XnZyXpcCw-JWB4mKQiQb0',
    authDomain: 'una-mano-una-patita.firebaseapp.com',
    databaseURL: 'https://una-mano-una-patita.firebaseio.com',
    projectId: 'una-mano-una-patita',
    storageBucket: 'una-mano-una-patita.appspot.com',
    messagingSenderId: '606142101545',
    appId: '1:606142101545:web:4710f866e27855f424c438',
    measurementId: 'G-MTKBJF2J4L'
};

const appRoutes: Routes = [
    {
        path: '',
        loadChildren: './main/main.module#MainModule'
    },
    {
        path: '**',
        redirectTo: '/'
    }
];

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        RouterModule.forRoot(appRoutes),
        // AngularFire
        AngularFireAuthModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFireStorageModule,
        // Shared module
        SharedModule,
        // Auth module
        AuthModule,
        // Angulal material
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatListModule,
        MatDialogModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule { }
