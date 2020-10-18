import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

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
        FlexLayoutModule,
        // Angular material modules
        MatInputModule,
        MatButtonModule
    ],
    entryComponents: [
        AuthDialogComponent
    ]
})
export class AuthModule { }
