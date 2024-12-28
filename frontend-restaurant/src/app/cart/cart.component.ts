import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';
import { CommandeService } from '../services/commande.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommandeMenu } from '../models/commande-menu.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CommandeMenu[] = [];
  isLoggedIn = false;

  constructor(
    private cartService: CartService,
    private commandeService: CommandeService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
    });
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  updateQuantity(item: CommandeMenu, change: number): void {
    const newQuantity = item.quantite + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.menu.id, newQuantity);
    } else {
      this.removeItem(item);
    }
  }

  removeItem(item: CommandeMenu): void {
    this.cartService.removeFromCart(item.menu.id);
  }

  getTotal(): number {
    return this.cartService.getCartTotal();
  }

  checkout(): void {
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
      return;
    }

    const clientId = this.authService.getCurrentUserId();
    if (!clientId) return;

    this.commandeService.passerCommande(clientId, this.cartItems).subscribe(
      (response) => {
        console.log('Commande passée avec succès', response);
        this.cartService.clearCart();
        this.router.navigate(['/commandes']);
      },
      (error) => {
        console.error('Erreur lors de la commande', error);
      }
    );
  }
}