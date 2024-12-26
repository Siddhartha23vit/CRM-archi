import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('authToken')) {
      this.router.navigate(['/Admin']);
    }
  }

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        const token = response.token;
        const decodedToken = this.authService.decodeToken(token);
        if (decodedToken['user'] && decodedToken['user'].role === "superAdmin") {
          this.router.navigate(['Admin']);
        } else {
          this.router.navigate(['User']);
        }
      },
      (error) => {
        console.error('Login failed', error);
        this.loginFailed = true;
        setTimeout(() => {
          this.loginFailed = false;
        }, 4000);
      }
    );
  }
}
