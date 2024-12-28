import { Component, OnInit } from "@angular/core";
import { AdminService } from "../services/admin.service";
import { Router } from '@angular/router';
import { CartService } from "../services/cart.service";

interface Category {
	id: number;
	nom: string;
  }
  
  interface MenuItem {
	id: number;
	nom: string;
	description: string;
	prix: number;
	imageURL: string;
	categorie: Category; // Maintenant c'est un objet Category au lieu d'une string
  }

@Component({
  selector: "menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["../app.component.css", "./menu.component.css"],
})
export class MenuComponent implements OnInit {
	activeTab: string = "tout";
	tabs: Category[] = [{ id: 0, nom: "tout" }];
	menuItems: MenuItem[] = [];
	//cartItems: (MenuItem & { quantity: number })[] = [];
	isCartOpen: boolean = false;
	isClientFormVisible: boolean = false; // New variable for client form modal
	cartItems: any[] = [];

  
	constructor(private adminService: AdminService,  private router: Router,  private cartService: CartService,
		) {}
  
		ngOnInit() {
			this.cartService.cartItems$.subscribe(items => {
			  this.cartItems = items;
			});
	  this.loadMenuItems();
	  this.loadCategories();
	}
  
	loadMenuItems() {
	  this.adminService.getMenus().subscribe(
		(data: MenuItem[]) => {
		  this.menuItems = data;
		},
		(error) => {
		  console.error('Error loading menu items:', error);
		}
	  );
	}
  
	loadCategories() {
	  this.adminService.getCategories().subscribe(
		(categories: Category[]) => {
		  this.tabs = [{ id: 0, nom: "tout" }, ...categories];
		},
		(error) => {
		  console.error('Error loading categories:', error);
		}
	  );
	}
  
	getFilteredItems(): MenuItem[] {
	  if (this.activeTab === "tout") {
		return this.menuItems;
	  }
	  return this.menuItems.filter((item) => item.categorie.nom === this.activeTab);
	}
  
	itemInCurrentTab(item: MenuItem): boolean {
	  return this.activeTab === "tout" || item.categorie.nom === this.activeTab;
	}
  
	setActiveTab(tab: string) {
	  this.activeTab = tab;
	}



////////////////////////////////



toggleCart() {
	const clientId = localStorage.getItem('clientId');
	if (clientId) {
	  this.router.navigate(['/commande']);
    } else {
      // Afficher le formulaire de connexion
      this.isClientFormVisible = true;
    }
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }


	toggleClientForm() {
		this.isClientFormVisible = !this.isClientFormVisible; // Toggle the form modal visibility
	  }
	
	  closeClientForm() {
		this.isClientFormVisible = false; // Close the client form modal
	  }
	

}