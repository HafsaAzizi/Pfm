import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-commande-page',
  template: `
    <div class="commande-container">
      <h2>Votre Commande</h2>
      
      <div class="cart-items" *ngIf="cartItems.length > 0">
        <div *ngFor="let item of cartItems" class="cart-item">
          <div class="item-image">
            <img [src]="item.imageURL" [alt]="item.nom" />
          </div>
          <div class="item-details">
            <h3>{{item.nom}}</h3>
            <p>{{validatePrice(item.prix).toFixed(2)}} DH</p>
          </div>
          <div class="item-quantity">
            <button (click)="updateQuantity(item, -1)" [disabled]="item.quantite <= 1">-</button>
            <span>{{item.quantite}}</span>
            <button (click)="updateQuantity(item, 1)">+</button>
          </div>
          <div class="item-total">
            {{(validatePrice(item.prix) * item.quantite).toFixed(2)}} DH
          </div>
          <button class="remove-btn" (click)="removeItem(item.id)">×</button>
        </div>
        
        <div class="cart-summary">
          <div class="total">Total: {{calculateTotal().toFixed(2)}} DH</div>
          <button 
            class="confirm-btn" 
            (click)="confirmerCommande()"
            [disabled]="!isValidCart()"
          >
            Confirmer la commande
          </button>
        </div>
      </div>

      <div class="empty-cart" *ngIf="cartItems.length === 0">
        <p>Votre panier est vide</p>
        <button (click)="retourMenu()">Retour au menu</button>
      </div>
    </div>
  `,
  styleUrls: ['./commande-page.component.css']
})
export class CommandePageComponent implements OnInit {
  cartItems: any[] = [];
  clientId: string | null = null;

  constructor(
    private cartService: CartService,
    private commandeService: CommandeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientId = localStorage.getItem('clientId');
    if (!this.clientId) {
      this.router.navigate(['/']);
      return;
    }

    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  validatePrice(prix: any): number {
    const validatedPrice = Number(prix);
    return !isNaN(validatedPrice) && validatedPrice > 0 ? validatedPrice : 0;
  }

  isValidCart(): boolean {
    return this.cartItems.every(item => 
      this.validatePrice(item.prix) > 0 && item.quantite > 0
    );
  }

  updateQuantity(item: any, change: number) {
    const newQuantity = item.quantite + change;
    if (newQuantity > 0) {
      this.cartService.updateQuantity(item.id, newQuantity);
    }
  }

  removeItem(itemId: number) {
    this.cartService.removeFromCart(itemId);
  }

  calculateTotal(): number {
    return this.cartService.calculateTotal();
  }

  confirmerCommande() {
    if (!this.clientId || !this.isValidCart()) {
      alert('Erreur: Panier invalide ou session expirée');
      return;
    }

    const commandeMenuRequests = this.cartItems.map(item => ({
      menu: { id: item.id },
      quantite: item.quantite
    }));

    this.commandeService.createCommande(Number(this.clientId), commandeMenuRequests)
      .subscribe({
        next: (response) => {
          this.cartService.clearCart();
          alert('Commande confirmée avec succès!');
          this.router.navigate(['/commandes']);
        },
        error: (error) => {
          console.error('Erreur lors de la création de la commande:', error);
          alert('Erreur lors de la création de la commande. Veuillez réessayer.');
        }
      });
  }

  retourMenu() {
    this.router.navigate(['/']);
  }
}
