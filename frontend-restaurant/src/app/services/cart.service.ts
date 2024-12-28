import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  id: number;
  nom: string;
  prix: number;
  quantite: number;
  imageURL: string;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
  
  constructor() {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      // Validate prices when loading from storage
      const validatedCart = parsedCart.map((item: CartItem) => ({
        ...item,
        prix: this.validatePrice(item.prix)
      }));
      this.cartItemsSubject.next(validatedCart);
    }
  }

  private validatePrice(prix: any): number {
    const validatedPrice = Number(prix);
    return !isNaN(validatedPrice) && validatedPrice > 0 ? validatedPrice : 0;
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }
  
  addToCart(item: any) {
    const validatedPrice = this.validatePrice(item.prix);
    if (validatedPrice <= 0) {
      console.error('Prix invalide pour l\'article:', item);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(i => i.id === item.id);
    
    if (existingItem) {
      existingItem.quantite += 1;
      this.cartItemsSubject.next([...currentItems]);
    } else {
      const newItem: CartItem = {
        ...item,
        prix: validatedPrice,
        quantite: 1
      };
      this.cartItemsSubject.next([...currentItems, newItem]);
    }
    
    this.saveCart();
  }

  updateQuantity(itemId: number, quantite: number) {
    if (quantite <= 0) return;

    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map(item => 
      item.id === itemId ? { ...item, quantite } : item
    );
    
    this.cartItemsSubject.next(updatedItems);
    this.saveCart();
  }

  removeFromCart(itemId: number) {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.id !== itemId);
    this.cartItemsSubject.next(updatedItems);
    this.saveCart();
  }

  clearCart() {
    this.cartItemsSubject.next([]);
    localStorage.removeItem('cartItems');
  }

  calculateTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => {
      const itemPrice = this.validatePrice(item.prix);
      return total + (itemPrice * item.quantite);
    }, 0);
  }

  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItemsSubject.value));
  }
}

