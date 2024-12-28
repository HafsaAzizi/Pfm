import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { UploadResponse } from 'src/app/upload.model';

@Component({
  selector: 'app-menu-management',
  templateUrl: './menu-management.component.html',
  styleUrls: ['./menu-management.component.css']
})
export class MenuManagementComponent implements OnInit {
  menus: any[] = [];
  categories: any[] = [];
  selectedMenu: any = {};
  isEditModalOpen = false;
  selectedFile: File | null = null;

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.loadMenus();
    this.loadCategories();
  }

  loadMenus() {
    this.adminService.getMenus().subscribe(
      data => this.menus = data,
      error => console.error('Error loading menus:', error)
    );
  }


   // Nouvelle méthode pour charger les catégories
   loadCategories() {
    this.adminService.getCategories().subscribe(
      data => this.categories = data,
      error => console.error('Error loading categories:', error)
    );
  }

  openAddMenuModal() {
    this.selectedMenu = {};
    this.isEditModalOpen = true;
  }

  editMenu(menu: any) {
    this.selectedMenu = { ...menu };
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedMenu = {};
    this.selectedFile = null;
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
        // Vérification du type de fichier (optionnel)
        if (file.type.match(/image\/*/) === null) {
            console.error('Only images are supported');
            return;
        }
        
        // Vérification de la taille (10MB max selon votre configuration backend)
        if (file.size > 10 * 1024 * 1024) { // 10MB en octets
            console.error('File size cannot exceed 10MB');
            return;
        }

        this.selectedFile = file;
        
        // Prévisualisation de l'image
        const reader = new FileReader();
        reader.onload = (e: any) => {
            this.selectedMenu.imageURL = e.target.result; // Pour la prévisualisation uniquement
        };
        reader.readAsDataURL(file);
    }
}

async updateMenu() {
  try {
      if (this.selectedFile) {
          const uploadResult = await this.adminService.uploadImage(this.selectedFile).toPromise();
          if (uploadResult && uploadResult.imageUrl) {
              // Utilisez l'URL retournée par le serveur
              this.selectedMenu.imageURL = uploadResult.imageUrl;
          } else {
              throw new Error('Invalid upload response');
          }
      }

      if (this.selectedMenu.id) {
          await this.adminService.updateMenu(this.selectedMenu.id, this.selectedMenu).toPromise();
      } else {
          await this.adminService.addMenu(this.selectedMenu).toPromise();
      }

      this.loadMenus();
      this.closeEditModal();
  } catch (error) {
      console.error('Error updating menu:', error);
      // Ajoutez ici la gestion des erreurs (par exemple, afficher un message à l'utilisateur)
  }
}

  deleteMenu(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce menu ?')) {
      this.adminService.deleteMenu(id).subscribe(
        () => {
          this.loadMenus();
        },
        error => console.error('Error deleting menu:', error)
      );
    }
  }
}