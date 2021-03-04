import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { FooterComponent } from './footer/footer.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
    declarations: [
        FooterComponent,
        LoadingComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule
    ],
    exports: [
        FooterComponent,
        LoadingComponent
    ]
})

export class SharedModule { }
