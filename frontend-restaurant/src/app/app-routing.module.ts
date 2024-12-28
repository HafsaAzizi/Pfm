// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { MenuManagementComponent } from './admin/menu-management/menu-management.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { CommandePageComponent } from './commande-page/commande-page.component';
import { ModifierCommandePageComponent } from './modifier-commande-page/modifier-commande-page.component';
import { CommandeListComponent } from './commande-list/commande-list.component';

const routes: Routes = [
  // Route principale pour la page d'accueil
  { path: '', component: HomeComponent },
  // Routes client indépendantes
  { path: 'login', component: ClientFormComponent },
  { path: 'register', component: ClientFormComponent },
  { path: 'commande', component: CommandePageComponent },
  { path: 'commandes', component: CommandeListComponent },
  { path: 'modifier-commande/:id', component: ModifierCommandePageComponent },

  { path: 'admin/login', component: LoginComponent },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: AdminDashboardComponent },
      { path: 'menu', component: MenuManagementComponent },
      { path: 'commandes', component: CommandesComponent },
      { path: 'statistics', component: StatisticsComponent },
      { path: 'categories', component: CategoriesComponent },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }