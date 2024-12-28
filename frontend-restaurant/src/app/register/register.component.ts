import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Client } from '../models/client.model'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  template: `
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">Inscription</h2>
      <form (ngSubmit)="onSubmit()" #registerForm="ngForm" class="max-w-md">
        <div class="mb-4">
          <label for="nom" class="block mb-2">Nom</label>
          <input
            type="text"
            id="nom"
            name="nom"
            [(ngModel)]="client.nom"
            required
            class="w-full p-2 border rounded"
          >
        </div>
        <div class="mb-4">
          <label for="email" class="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            [(ngModel)]="client.email"
            required
            class="w-full p-2 border rounded"
          >
        </div>
        <div class="mb-4">
          <label for="adresse" class="block mb-2">Adresse</label>
          <input
            type="text"
            id="adresse"
            name="adresse"
            [(ngModel)]="client.adresse"
            required
            class="w-full p-2 border rounded"
          >
        </div>
        <div class="mb-4">
          <label for="numTelephone" class="block mb-2">Téléphone</label>
          <input
            type="tel"
            id="numTelephone"
            name="numTelephone"
            [(ngModel)]="client.numTelephone"
            required
            class="w-full p-2 border rounded"
          >
        </div>
        <button
          type="submit"
          [disabled]="!registerForm.form.valid"
          class="bg-blue-500 text-white px-4 py-2 rounded"
        >
          S'inscrire
        </button>
      </form>
    </div>
  `
})
export class RegisterComponent {
  client: Client = {
    nom: '',
    email: '',
    adresse: '',
    numTelephone: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.register(this.client).subscribe(
      response => {
        console.log('Inscription réussie', response);
        this.router.navigate(['/cart']);
      },
      error => {
        console.error('Erreur lors de l\'inscription', error);
      }
    );
  }
}