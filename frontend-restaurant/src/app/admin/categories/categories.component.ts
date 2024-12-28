// categories.component.ts
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: any[] = [];
  newCategory = { nom: '' };
  isEditing = false;
  editingCategory: any = null;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.adminService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  onSubmit(): void {
    if (this.isEditing) {
      this.adminService
        .updateCategory(this.editingCategory.id, this.newCategory)
        .subscribe(() => {
          this.loadCategories();
          this.resetForm();
        });
    } else {
      this.adminService.addCategory(this.newCategory).subscribe(() => {
        this.loadCategories();
        this.resetForm();
      });
    }
  }

  editCategory(category: any): void {
    this.isEditing = true;
    this.editingCategory = category;
    this.newCategory = { nom: category.nom };
  }

  deleteCategory(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ?')) {
      this.adminService.deleteCategory(id).subscribe(() => {
        this.loadCategories();
      });
    }
  }

  resetForm(): void {
    this.isEditing = false;
    this.editingCategory = null;
    this.newCategory = { nom: '' };
  }
}
