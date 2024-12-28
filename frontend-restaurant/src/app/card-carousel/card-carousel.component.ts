import { Component, OnInit, ViewChild } from "@angular/core";
import { CarouselComponent, CarouselConfig } from "ngx-bootstrap/carousel";
import { AdminService } from "../services/admin.service";

@Component({
  selector: "card-carousel",
  templateUrl: "./card-carousel.component.html",
  providers: [
    {
      provide: CarouselConfig,
      useValue: { showIndicators: false, showControls: false },
    },
  ],
  styleUrls: ["./card-carousel.component.css"],
})
export class CardCarouselComponent implements OnInit {
  menus: any[] = [];
  carouselItems: any[] = [];
  interval: any;

  @ViewChild("carousel", { static: true }) carousel!: CarouselComponent;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadMenus();
  }

  loadMenus() {
    this.adminService.getMenus().subscribe(
      (data) => {
        this.menus = data;
        this.initializeCarousel();
      },
      (error) => {
        console.error('Error loading menus:', error);
      }
    );
  }

  initializeCarousel() {
    if (this.menus.length > 0) {
      this.carouselItems = this.menus.slice(0, 4);
      this.startAutoplay();
    }
  }

  startAutoplay() {
    this.interval = setInterval(() => {
      this.slideNext();
    }, 3000);
  }

  stopAutoplay() {
    clearInterval(this.interval);
  }

  slideNext() {
    const shiftedMenu = this.menus.shift();
    if (shiftedMenu) {
      this.menus.push(shiftedMenu);
    }
    this.carouselItems = this.menus.slice(0, 4);
  }

  slidePrev() {
    const poppedMenu = this.menus.pop();
    if (poppedMenu) {
      this.menus.unshift(poppedMenu);
    }
    this.carouselItems = this.menus.slice(0, 4);
  }
}

