import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ChartOptions, ChartData } from 'chart.js';
import { Menu } from '../../models/menu.model';

@Component({
  selector: 'app-statistiques',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent implements OnInit {

  platLePlusVendu: Menu | null = null;
  // Changez le type de revenusParCategorie en tableau d'objets
revenusParCategorie: { nomCategorie: string, revenu: number }[] = [];

  revenusTotaux: number = 0;

  // Variables pour les graphiques
  public chartOptions: ChartOptions = {
    responsive: true,
  };

  public chartData: ChartData = {
    labels: [],  // Les catégories
    datasets: [
      {
        data: [],  // Les revenus
        label: 'Revenus par catégorie',
        backgroundColor: 'rgba(0,123,255,0.5)',  // Couleur des barres
      }
    ]
  };
  

  constructor(private statistiqueService: AdminService) { }

  ngOnInit(): void {
    this.getPlatLePlusVendu();
    this.getRevenusParCategorie();
  }

  getPlatLePlusVendu(): void {
    this.statistiqueService.getPlatLePlusVendu().subscribe(data => {
      this.platLePlusVendu = data;
    });
  }

  getRevenusParCategorie(): void {
    this.statistiqueService.getRevenusParCategorie().subscribe({
      next: (data) => {
        // Vérification de la structure des données reçues
        console.log('Données des revenus par catégorie:', data);
  
        // Transformation des données pour les adapter au format requis
        this.revenusParCategorie = data.map(([nomCategorie, revenu]: [string, number]) => ({
          nomCategorie,
          revenu
        }));
  
        // Mise à jour des données du graphique
        this.updateChartData();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des revenus par catégorie:', error);
      }
    });
  }
  
  

  updateChartData(): void {
    // Assurez-vous que les labels et datasets sont bien mis à jour
    this.chartData.labels = this.revenusParCategorie.map(item => item.nomCategorie);  // Récupère les noms des catégories
    this.chartData.datasets[0].data = this.revenusParCategorie.map(item => item.revenu);  // Récupère les revenus
  
    console.log('Labels:', this.chartData.labels);
    console.log('Datasets:', this.chartData.datasets[0].data);
  }
  
}
