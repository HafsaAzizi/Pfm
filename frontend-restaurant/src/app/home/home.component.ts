import { Component, HostListener } from "@angular/core";
import { ScrollService } from "src/app/services/scroll.service";
import { Router, NavigationEnd } from "@angular/router";
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  hasScrolledPastHome = false;
  showMainContent = true;

  constructor(
    private scrollService: ScrollService,
    private router: Router
  ) {
    // Écouter les changements de route
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      // Cacher le contenu principal pour les routes login, register et commande
      this.showMainContent = !['/login', '/register', '/commande'].includes(event.url);
    });
  }

  @HostListener("window:scroll", ["$event"])
  onScroll(event: Event) {
    const scrollPosition = window.scrollY;
    const threshold = window.innerHeight - 750;
    this.hasScrolledPastHome = scrollPosition > threshold;
  }

  scrollToBookingTable() {
    this.scrollService.scrollTo("booking-table");
  }
}