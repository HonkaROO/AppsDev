import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface RegisterResponse {
    success: string; // Define the expected properties and their types
  }

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient,  private router: Router) { }

  register() {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.http.post<RegisterResponse>('http://localhost:8080/api/register/', data)
    .subscribe(
      response => {
        console.log(response);
        // Handle successful login
        if (response.success) { // TypeScript knows the structure of the response object
          // Navigate to the desired URL
          this.router.navigate(['/login']);
        }
      },
      error => {
        console.error(error);
        // Handle login error
      }
    );
  }
}


