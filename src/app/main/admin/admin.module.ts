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
    MatIconModule,
    MatTableModule
} from '@angular/material';

// Components
import { AdminComponent } from './admin/admin.component';
import { PublishComponent } from './admin/components/publish/publish.component';
import { PublishAdoptionComponent } from './admin/components/publish-adoption/publish-adoption.component';
import { PublishLostComponent } from './admin/components/publish-lost/publish-lost.component';
import { LostTableComponent } from './admin/components/lost-table/lost-table.component';
import { AdoptionTableComponent } from './admin/components/adoption-table/adoption-table.component';

// App Modules
import { SharedModule } from './../../shared/shared.module';

// Guard
import { AuthGuard } from 'src/app/guard/auth.guard';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            { path: 'panel', component: PublishComponent, canActivate: [AuthGuard] },
            { path: 'publicar/adopcion', component: PublishAdoptionComponent, canActivate: [AuthGuard] },
            { path: 'tabla-perdidos', component: LostTableComponent, canActivate: [AuthGuard] },
            { path: 'tabla-adopciones', component: AdoptionTableComponent, canActivate: [AuthGuard] },
            { path: 'publicar/perdido', component: PublishLostComponent, canActivate: [AuthGuard] },
            { path: 'editar/adopcion/:id', component: PublishAdoptionComponent, canActivate: [AuthGuard] },
            { path: 'editar/perdido/:id', component: PublishLostComponent, canActivate: [AuthGuard] },
            { path: '', redirectTo: 'panel', pathMatch: 'full' },
            { path: '**', redirectTo: 'panel' },
        ]
    }
];

@NgModule({
    declarations: [
        AdminComponent,
        PublishComponent,
        PublishAdoptionComponent,
        PublishLostComponent,
        LostTableComponent,
        AdoptionTableComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        ReactiveFormsModule,
        FlexLayoutModule,
        // Material
        MatFormFieldModule,
        MatTableModule,
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
