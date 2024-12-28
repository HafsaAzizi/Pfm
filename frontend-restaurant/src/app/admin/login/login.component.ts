import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

// login.component.ts
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  admin = { nom: '', email: '' };
  errorMessage = '';

  constructor(
    private adminService: AdminService, 
    private router: Router
  ) {}

  ngOnInit() {
    if (this.adminService.isLoggedIn()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }

  onSubmit() {
    this.adminService.login(this.admin).subscribe({
      next: () => {
        this.router.navigate(['/admin/dashboard']);
      },
      error: (error) => {
        console.error('Login failed', error);
        this.errorMessage = 'Échec de la connexion. Veuillez vérifier vos identifiants.';
      }
    });
  }
}