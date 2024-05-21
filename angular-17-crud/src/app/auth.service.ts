// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8080/'; // Replace with your backend URL

  constructor(private http: HttpClient) { }

  passwordLogin(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/password-login/`, { username, password });
  }

  faceLogin(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('image', image);
    return this.http.post(`${this.apiUrl}/face-login/`, formData);
  }

  register(username: string, password: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    formData.append('image', image);
    return this.http.post(`${this.apiUrl}/register/`, formData);
  }
}
