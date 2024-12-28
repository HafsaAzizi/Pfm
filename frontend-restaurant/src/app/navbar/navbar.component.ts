import {Component, HostListener} from "@angular/core";

@Component({
	selector: "navbar",
	templateUrl: "./navbar.component.html",
	styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent {
	showMenu = false;
	isSmallScreen = window.innerWidth <= 992;
	isTransparentBg = true;
	activeSection: string | null = null;

	menuItems = [
		{ label: "ACCUEIL", link: "#home" },
		{ label: "À PROPOS DE NOUS", link: "#about-us" },
		{ label: "CHEFS", link: "#chefs" },
		{ label: "MENU", link: "#menu" },
		{ label: "GALERIE", link: "#gallery" },
		{ label: "CONTACT", link: "#contacts" },
	];
	

	toggleMenu() {
		this.showMenu = !this.showMenu;
	}

	closeMenu() {
		this.showMenu = false;
	}

	@HostListener("window:resize", ["$event"])
	onResize(event: any) {
		this.isSmallScreen = event.target.innerWidth <= 992;
		// Hide the menu when resizing from large to small screen
		if (this.isSmallScreen) {
			this.showMenu = false;
		}
	}

	@HostListener("window:scroll", [])
	onWindowScroll() {
		// Determine the active section based on scrolling
		const sections = ["about-us", "chefs", "menu", "gallery", "contacts"];
		const scrollPosition = window.scrollY;
		let activeSection: string | null = null;

		for (const section of sections) {
			const element = document.getElementById(section);
			if (element) {
				const offsetTop = element.offsetTop;
				if (scrollPosition >= offsetTop - 120) {
				activeSection = section;
				}
			}
		}

		this.activeSection = activeSection;

		// Check if the user has scrolled and remove the transparent background class
		this.isTransparentBg = window.scrollY < 90;
	}

	constructor() {
		// Trigger the initial check for screen size
		this.onResize({target: {innerWidth: window.innerWidth}});
	}
}
