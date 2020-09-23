import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { FooterComponent } from './footer/footer.component';

@NgModule({
    declarations: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        // Angular material modules
    ],
    exports: [
        FooterComponent
    ]
})

export class SharedModule { }
