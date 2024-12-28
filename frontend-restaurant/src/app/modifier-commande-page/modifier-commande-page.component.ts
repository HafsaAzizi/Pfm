import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommandeService } from '../services/commande.service';
import { AdminService } from '../services/admin.service';
import { Commande, MenuQuantite, MenuItem } from '../models/type';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-modifier-commande-page',
  templateUrl: './modifier-commande-page.component.html',
  styleUrls: ['./modifier-commande-page.component.css'],
})
export class ModifierCommandePageComponent {
 /* commandeId: number | null = null;
  commande: Commande | null = null;
  loading = false;
  error: string | null = null;

  // Map pour stocker les menus enrichis (détails complets)
  menusComplets: Map<number, MenuItem> = new Map();

  // Attributs globaux de la commande
  prixTotal: number = 0;
  quantiteTotale: number = 0;

  constructor(
    private route: ActivatedRoute,
    private commandeService: CommandeService,
    private menuService: AdminService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Identifiant de commande invalide.';
      return;
    }

    this.commandeId = Number(id);
    this.fetchCommande();
  }

  fetchCommande() {
    this.loading = true;
    this.error = null;

    this.commandeService
      .getCommandeById(this.commandeId!)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: (data) => {
          this.commande = data;
          if (this.commande && this.commande.menus) {
            this.fetchMenuDetails(this.commande.menus);
            this.updateCommandeTotals(); // Mettez à jour les totaux
          }
        },
        error: (err) => {
          this.error =
            typeof err === 'string'
              ? err
              : 'Impossible de charger la commande.';
          console.error('Erreur lors du chargement de la commande:', err);
        },
      });
  }

  fetchMenuDetails(menusQuantites: MenuQuantite[]) {
    const requests = menusQuantites.map((mq) =>
      this.menuService.getMenuById(mq.menu.id)
    );

    forkJoin(requests).subscribe({
      next: (menus: MenuItem[]) => {
        menus.forEach((menu) => {
          this.menusComplets.set(menu.id, menu); // Enregistrez les détails dans la Map
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des menus:', err);
        this.error =
          'Impossible de récupérer les détails des menus. Certains champs pourraient être manquants.';
      },
    });
  }

  getMenuDetails(menuId: number): MenuItem | null {
    return this.menusComplets.get(menuId) || null;
  }

  updateMenuQuantity(menuId: number, change: number) {
    if (!this.commande) return;

    const menu = this.commande.menus.find((m) => m.menu.id === menuId);
    if (menu) {
      const newQuantity = menu.quantite + change;
      if (newQuantity <= 0) {
        this.commande.menus = this.commande.menus.filter(
          (m) => m.menu.id !== menuId
        );
      } else {
        menu.quantite = newQuantity;
      }
      this.updateCommandeTotals(); // Recalculez les totaux après modification
    }
  }

  updateCommandeTotals() {
    if (!this.commande || !this.commande.menus) return;

    this.prixTotal = 0;
    this.quantiteTotale = 0;

    this.commande.menus.forEach((menuQuantite) => {
      const menuDetails = this.getMenuDetails(menuQuantite.menu.id);
      if (menuDetails) {
        this.prixTotal += menuDetails.prix * menuQuantite.quantite;
        this.quantiteTotale += menuQuantite.quantite;
      }
    });
  }

  updateCommande() {
    if (!this.commande || !this.commande.menus || this.commande.menus.length === 0) {
      this.error = 'Erreur : Commande invalide ou vide.';
      return;
    }

    this.loading = true;
    this.error = null;

    const menusQuantites = this.commande.menus.map((mq) => ({
      menu: { id: mq.menu.id }, // Envoyez uniquement l'ID comme attendu par le backend
      quantite: mq.quantite,
    }));

    this.commandeService
      .modifierCommande(this.commandeId!, menusQuantites)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe({
        next: () => {
          alert('Commande mise à jour avec succès.');
          this.router.navigate(['/commandes']);
        },
        error: (err) => {
          this.error =
            typeof err === 'string'
              ? err
              : 'Erreur lors de la mise à jour de la commande.';
          console.error('Erreur lors de la mise à jour de la commande:', err);
        },
      });
  }

  retourCommandes() {
    this.router.navigate(['/commandes']);
  }*/
}
