import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

    @ViewChild('homeVideo', { static: false }) homeVideo: ElementRef;

    constructor() { }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
        this.homeVideo.nativeElement.muted = true;
    }
}
