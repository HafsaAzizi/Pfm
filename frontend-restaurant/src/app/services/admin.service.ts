// admin.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UploadResponse } from '../upload.model';
import { EtatCommande } from '../models/type'; // Chemin d'accès au fichier où EtatCommande est défini


interface CategoryResponse {
  id: number;
  nom: string;
}

interface MenuResponse {
  id: number;
  nom: string;
  description: string;
  prix: number;
  imageURL: string;
  categorie: CategoryResponse;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private baseUrl = 'http://localhost:8080/api/admin';
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  private tokenKey = 'admin_token'; // Nouvelle clé pour le token

  constructor(private http: HttpClient) {
    // Vérifier à la fois le token et l'état d'authentification
    const token = localStorage.getItem(this.tokenKey);
    const authState = localStorage.getItem('isAuthenticated');
    if (token && authState === 'true') {
      this.isAuthenticated.next(true);
    } else {
      // Nettoyer si l'un des deux est manquant
      this.logout();
    }
  }

  login(admin: { nom: string; email: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, admin, { responseType: 'text' })
      .pipe(
        tap(response => {
          console.log('Login response:', response);
          // Stocker le token de réponse
          localStorage.setItem(this.tokenKey, response);
          this.isAuthenticated.next(true);
          localStorage.setItem('isAuthenticated', 'true');
        })
      );
  }

  logout(): void {
    this.isAuthenticated.next(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    const authState = localStorage.getItem('isAuthenticated');
    return !!(token && authState === 'true');
  }

  uploadImage(file: File): Observable<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadResponse>(`${this.baseUrl}/upload`, formData);
}


  // Your existing methods...
  getDailyRevenue(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/revenus/quotidien`);
  }

  getRevenueByCategory(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/revenus/par-categorie`);
  }

  getMenus(): Observable<MenuResponse[]> {
    return this.http.get<MenuResponse[]>(`${this.baseUrl}/menus`);
  }

  //////////////////////ajouter maintenant
  getMenuById(id: number): Observable<MenuResponse> {
    return this.http.get<MenuResponse>(`${this.baseUrl}/menus/${id}`);
  }
  
  addMenu(menu: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/menus`, menu);
  }

  deleteMenu(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/menus/${id}`);
  }

  updateMenu(id: number, menu: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/menus/${id}`, menu);
  }

// admin.service.ts
getCategories(): Observable<CategoryResponse[]> {
  return this.http.get<CategoryResponse[]>(`${this.baseUrl}/categories`);
}

addCategory(category: any): Observable<any> {
  return this.http.post<any>(`${this.baseUrl}/categories`, category);
}

updateCategory(id: number, category: any): Observable<any> {
  return this.http.put<any>(`${this.baseUrl}/categories/${id}`, category);
}

deleteCategory(id: number): Observable<void> {
  return this.http.delete<void>(`${this.baseUrl}/categories/${id}`);
}









// Ajout dans admin.service.ts
getCommandesEnAttente(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/commandes/en-attente`);
}

getCommandesTerminees(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/commandes-terminees`);
}

getRevenuQuotidien(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/revenu/quotidien`);
}

getRevenuHebdomadaire(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/revenu/hebdomadaire`);
}

getRevenuMensuel(): Observable<number> {
  return this.http.get<number>(`${this.baseUrl}/revenu/mensuel`);
}

getPlatLePlusVendu(): Observable<MenuResponse> {
  return this.http.get<MenuResponse>(`${this.baseUrl}/plat-plus-vendu`);
}

getRevenusParCategorie(): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/revenus-par-categorie`);
}

getCommandesNonLivrees(dureeEnHeures: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/commandes-non-livrees?dureeEnHeures=${dureeEnHeures}`);
}

getTableauDeBord(): Observable<any> {
  return this.http.get<any>(`${this.baseUrl}/tableau-de-bord`);
}

changerEtatCommande(commandeId: number, nouvelEtat: EtatCommande): Observable<any> {
  // Corrigez le paramètre "nouvelEtats" dans l'URL
  const url = `${this.baseUrl}/changerEtat/${commandeId}?nouvelEtats=${nouvelEtat}`;
  return this.http.patch(url, {}); // Corps vide, car tout est passé dans l'URL
}





}

