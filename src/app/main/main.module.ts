import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

const routes = [
    {
        path: 'admin',
        loadChildren: './admin/admin.module#AdminModule'
    },
    {
        path: '',
        loadChildren: './user-landing/user-landing.module#UserLandingModule'
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})

export class MainModule { }
