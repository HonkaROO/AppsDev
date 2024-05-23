import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  success: string; // Define the expected properties and their types
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usernameOrEmail: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) { }

  login() {
    const data = {
      username_or_email: this.usernameOrEmail,
      password: this.password
    };

    this.http.post<LoginResponse>('http://localhost:8080/api/login/', data)
      .subscribe(
        response => {
          console.log(response);
          // Handle successful login
          if (response.success) { // TypeScript knows the structure of the response object
            // Navigate to the desired URL
            this.router.navigate(['/tutorials']);
          }
        },
        error => {
          console.error(error);
          // Handle login error
        }
      );
  }
}