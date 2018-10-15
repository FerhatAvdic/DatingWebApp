import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AlertifyService } from '../_services/Alertify.service';
import { AuthService } from '../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService, 
    private router: Router, 
    private alretify: AlertifyService
    ){}
  canActivate(): boolean {
    if(this.authService.loggedIn()){
      return true;
    }

    this.alretify.error('You shall not pass!!!');
    this.router.navigate(['/home']);
    return false;
  }
}
