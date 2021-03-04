import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

// Components
import { UserLandingComponent } from './user-landing/user-landing.component';
import { HomeComponent } from './user-landing/components/home/home.component';
import { AdoptionCasesListComponent } from './user-landing/components/adoption-cases/adoption-cases-list/adoption-cases-list.component';
import { AdoptionCasesDetailsComponent } from './user-landing/components/adoption-cases/adoption-cases-details/adoption-cases-details.component';
import { LostCasesListComponent } from './user-landing/components/lost-cases/lost-cases-list/lost-cases-list.component';
import { LostCasesDetailsComponent } from './user-landing/components/lost-cases/lost-cases-details/lost-cases-details.component';
import { DonateComponent } from './user-landing/components/donate/donate.component';
import { BioHistoryComponent } from './user-landing/components/bio-history/bio-history.component';

// Angular Material Modules
import { MatTooltipModule } from '@angular/material';

// App Modules
import { SharedModule } from 'src/app/shared/shared.module';

const APP_ROUTES: Routes = [
    {
        path: '',
        component: UserLandingComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'adopciones-lista', component: AdoptionCasesListComponent },
            { path: 'adopcion/:name/:id', component: AdoptionCasesDetailsComponent },
            { path: 'perdidos-lista', component: LostCasesListComponent },
            { path: 'perdido/:name/:id', component: LostCasesDetailsComponent },
            { path: 'donar', component: DonateComponent },
            { path: 'quienes-somos', component: BioHistoryComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '**', redirectTo: 'home' },
        ]
    }
];

@NgModule({
    declarations: [
        UserLandingComponent,
        HomeComponent,
        AdoptionCasesListComponent,
        AdoptionCasesDetailsComponent,
        LostCasesListComponent,
        LostCasesDetailsComponent,
        DonateComponent,
        BioHistoryComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        FlexLayoutModule,
        MatTooltipModule,
        RouterModule.forChild(APP_ROUTES)
    ],
    exports: [
        RouterModule
    ]
})
export class UserLandingModule { }
