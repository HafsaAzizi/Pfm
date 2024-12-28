// commandes.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

// Define the EtatCommande type to match backend enum
//type EtatCommande = 'EN_PREPARATION' | 'PRET' | 'LIVRE';

// Define the mapping type
enum EtatCommande {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_PREPARATION = 'EN_PREPARATION',
  PRET = 'PRET',
  LIVRE = 'LIVRE'
}

export interface Commande {
  id: number;
  client: any;
  dateCommande: string;
  prixTotal: number;
  etatCommande: EtatCommande;
  //items?: any[]; // Si vous avez besoin des items de la commande
}

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {
  commandesEnAttente: any[] = [];
  commandesTerminees: any[] = [];
  tableauDeBord: any = {};
  revenuQuotidien: number = 0;
  revenuHebdomadaire: number = 0;
  revenuMensuel: number = 0;
  platLePlusVendu: any = null;
  revenusParCategorie: any[] = [];
  EtatCommande = EtatCommande;
    // Define the state mapping with proper typing
   /* private readonly etatMap: EtatCommandeMap = {
      'en_preparation': 'EN_PREPARATION',
      'pret': 'PRET',
      'livre': 'LIVRE'
    };*/

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.chargerDonnees();
    this.getCommandesTerminees();
  }

  chargerDonnees() {
    this.adminService.getCommandesEnAttente().subscribe({
      next: (commandes) => {
        console.log('Commandes en attente:', commandes);
        this.commandesEnAttente = commandes;
      },
      error: (error) => console.error('Erreur lors du chargement des commandes:', error)
    });

    this.adminService.getPlatLePlusVendu().subscribe({
      next: (plat) => {
        console.log('Plat le plus vendu:', plat);
        this.platLePlusVendu = plat;
      },
      error: (error) => console.error('Erreur lors du chargement du plat le plus vendu:', error)
    });

    this.adminService.getRevenusParCategorie().subscribe({
      next: (revenus) => {
        this.revenusParCategorie = revenus.map(([nomCategorie, revenu]: [string, number]) => ({
          nomCategorie,
          revenu
        }));
      },
      error: (error) => console.error('Erreur lors du chargement des revenus par catégorie:', error)
    });
    




    this.adminService.getTableauDeBord().subscribe(tableau => {
      this.tableauDeBord = tableau;
    });

    this.adminService.getRevenuQuotidien().subscribe(revenu => {
      this.revenuQuotidien = revenu;
    });

    this.adminService.getRevenuHebdomadaire().subscribe(revenu => {
      this.revenuHebdomadaire = revenu;
    });

    this.adminService.getRevenuMensuel().subscribe(revenu => {
      this.revenuMensuel = revenu;
    });

    
  }


     // Méthode pour récupérer les commandes terminées
     getCommandesTerminees(): void {
      this.adminService.getCommandesTerminees().subscribe(
        (data: Commande[]) => {
          this.commandesTerminees = data;  // Remplir la variable avec les commandes terminées
          console.log('Commandes terminées:', this.commandesTerminees);  // Vérifier les données dans la console
        },
        (error) => {
          console.error('Erreur lors de la récupération des commandes terminées', error);
        }
      );

      this.adminService.getCommandesEnAttente().subscribe({
        next: (commandes) => {
          console.log('Commandes en attente:', commandes);
          this.commandesEnAttente = commandes;
        },
        error: (error) => console.error('Erreur lors du chargement des commandes:', error)
      });
      



    }
    


 chargerCommandesEnAttente() {
    this.adminService.getCommandesEnAttente().subscribe({
      next: (commandes) => {
        console.log('Commandes en attente:', commandes);
        this.commandesEnAttente = commandes;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des commandes en attente:', err);
      },
    });
  }

  changerEtatCommande(commandeId: number, nouvelEtat: EtatCommande) {
    console.log(`Tentative de changement d'état pour la commande ${commandeId} à ${nouvelEtat}`);
    this.adminService.changerEtatCommande(commandeId, nouvelEtat).subscribe({
      next: (response) => {
        console.log(`État changé avec succès pour commande ${commandeId}:`, response);
        this.chargerCommandesEnAttente(); // Recharge les commandes
      },
      error: (err) => {
        console.error(`Erreur lors du changement d'état pour commande ${commandeId}:`, err);
      }
    });
  }
  


 
  

  }

 
