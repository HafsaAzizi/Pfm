import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CardCarouselComponent } from './card-carousel/card-carousel.component';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { AboutComponent } from './about/about.component';
import { TeamComponent } from './team/team.component';
import { ApiService } from './api.service';  // Importation du service
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './admin/login/login.component';
import { MenuManagementComponent } from './admin/menu-management/menu-management.component';
import { CommandesComponent } from './admin/commandes/commandes.component';
import { StatisticsComponent } from './admin/statistics/statistics.component';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { AppRoutingModule } from './app-routing.module';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { HomeComponent } from './home/home.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { CategoriesComponent } from './admin/categories/categories.component'; // Importer le module de routing
import { ClientFormComponent } from './client-form/client-form.component';
import { CommandePageComponent } from './commande-page/commande-page.component';
import { CommandeListComponent } from './commande-list/commande-list.component';
import { ModifierCommandePageComponent } from './modifier-commande-page/modifier-commande-page.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CardCarouselComponent,
    MenuComponent,
    FooterComponent,
    BookingFormComponent,
    AboutComponent,
    TeamComponent,
    LoginComponent,
    MenuManagementComponent,
    CommandesComponent,
    StatisticsComponent,
    AdminLayoutComponent,
    HomeComponent,
    AdminDashboardComponent,
    CategoriesComponent,
   
    ClientFormComponent,
    CommandePageComponent,
    CommandeListComponent,
    ModifierCommandePageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CarouselModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule, 
    FormsModule, // Ajoutez FormsModule ici
    AppRoutingModule,
    NgChartsModule, // Ajouter le module de routing dans les imports

  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
