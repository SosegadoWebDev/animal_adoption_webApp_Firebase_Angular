import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Angular material modules
import {
    MatInputModule,
    MatButtonModule
} from '@angular/material';

// Components
import { AuthDialogComponent } from './auth-dialog/auth-dialog.component';

@NgModule({
    declarations: [
        AuthDialogComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        // Angular material modules
        MatInputModule,
        MatButtonModule
    ],
    entryComponents: [
        AuthDialogComponent
    ]
})
export class AuthModule {

}
