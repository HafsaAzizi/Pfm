import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClientAuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const clientId = localStorage.getItem('clientId');
    if (clientId) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}