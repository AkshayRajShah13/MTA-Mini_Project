import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { RouterModule } from '@angular/router';


@Component({
    selector: 'app-about-banner',
    standalone: true,
    templateUrl: './about-banner.component.html',
    styleUrl: './about-banner.component.css',
    imports: [NavbarComponent,RouterModule]
})
export class AboutBannerComponent {

}
