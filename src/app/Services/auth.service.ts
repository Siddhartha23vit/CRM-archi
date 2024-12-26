// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as jwt from 'jwt-decode';
import { Router } from '@angular/router';


interface DecodedToken {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticatedFlag: boolean = true;
  private tokenKey = 'authToken';

  constructor(private http: HttpClient, private router: Router) {
    this.setAuthenticationStatus(true);
  }

  login(username: string, password: string): Observable<any> {
    const mockResponse = {
      token: 'mock-token',
      user: { role: 'superAdmin' }
    };
    return new Observable(observer => {
      observer.next(mockResponse);
      observer.complete();
    });
  }

  decodeToken(token: string): any {
    return {
      user: {
        role: 'superAdmin'
      }
    };
  }

  setAuthenticationStatus(isAuthenticated: boolean): void {
    this.isAuthenticatedFlag = true;
  }

  isAuthenticated(): boolean {
    return true;
  }

  logout(): void {
    this.router.navigate(['/Admin']);
  }
}
