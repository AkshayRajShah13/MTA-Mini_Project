import { Component } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { FooterComponent } from "../../footer/footer.component";
import { ContactUsComponent } from "../../contact-us/contact-us.component";
import { AboutBannerComponent } from "../../about-banner/about-banner.component";

@Component({
    selector: 'app-homepage',
    standalone: true,
    templateUrl: './homepage.component.html',
    styleUrl: './homepage.component.css',
    imports: [NavbarComponent, FooterComponent, ContactUsComponent, AboutBannerComponent]
})
export class HomepageComponent {

}
