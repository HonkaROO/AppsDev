import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SentimentAnalysisService {
  private apiUrl = 'http://localhost:8080/api/analyze-sentiment/';

  constructor(private http: HttpClient) { }

  analyzeSentiment(comment: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { comment });
  }
}


//sent
