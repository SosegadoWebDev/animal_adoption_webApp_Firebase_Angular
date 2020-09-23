import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Material
import {
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule
} from '@angular/material';

// Components
import { AdminComponent } from './admin/admin.component';
import { PublishComponent } from './admin/components/publish/publish.component';
import { PublishAdoptionComponent } from './admin/components/publish-adoption/publish-adoption.component';
import { PublishLostComponent } from './admin/components/publish-lost/publish-lost.component';

// Guard
import { AuthGuard } from 'src/app/guard/auth.guard';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'publicar', component: PublishComponent, canActivate: [AuthGuard] },
            { path: 'publicar/adopcion', component: PublishAdoptionComponent, canActivate: [AuthGuard] },
            { path: 'publicar/perdido', component: PublishLostComponent, canActivate: [AuthGuard] },
            { path: 'editar/adopcion/:id', component: PublishAdoptionComponent, canActivate: [AuthGuard] },
            { path: 'editar/perdido/:id', component: PublishLostComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'publicar', pathMatch: 'full' },
            { path: '**', redirectTo: 'publicar' },
        ]
    }
];

@NgModule({
    declarations: [
        AdminComponent,
        PublishComponent,
        PublishAdoptionComponent,
        PublishLostComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // Material
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatIconModule,
        RouterModule.forChild(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})

export class AdminModule { }
