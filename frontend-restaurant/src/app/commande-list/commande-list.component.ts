import { Component, OnInit } from '@angular/core';
import { CommandeService } from '../services/commande.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-commande-list',
  templateUrl: './commande-list.component.html',
  styleUrls: ['./commande-list.component.css'],
})
export class CommandeListComponent implements OnInit {
  commandes: any[] = [];
  clientId: string | null = null;

  constructor(private commandeService: CommandeService, private router: Router) {}

  ngOnInit() {
    this.clientId = localStorage.getItem('clientId');
    if (!this.clientId) {
      this.router.navigate(['/']);
      return;
    }

    this.fetchCommandes();
  }

  fetchCommandes() {
    this.commandeService.getCommandesClient(Number(this.clientId)).subscribe({
      next: (data) => {
        this.commandes = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commandes:', err);
        alert('Impossible de charger vos commandes.');
      },
    });
  }

  modifierCommande(commande: any) {
    this.router.navigate(['/modifier-commande', commande.id]);
  }

  supprimerCommande(commandeId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette commande ?')) {
      this.commandeService.supprimerCommande(commandeId).subscribe({
        next: () => {
          alert('Commande supprimée avec succès.');
          this.fetchCommandes(); // Recharge la liste après suppression
        },
        error: (err) => {
          if (err.status === 400) {
            // Cas où la commande n'est pas en attente
            alert(err.error || 'Impossible de supprimer cette commande. Elle n\'est pas en attente.');
          } else if (err.status === 404) {
            // Cas où la commande n'existe pas
            alert('Commande introuvable.');
          } else {
            // Autres erreurs
            console.error('Erreur lors de la suppression de la commande:', err);
            alert('Erreur lors de la suppression de la commande.');
          }
        },
      });
    }
  }

  goToHome() {
    this.router.navigate(['/']); // Navigate to the home page
  }
  
}
