import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'https://daekyung-park-comp-3133-101104521-assignment1.vercel.app/graphql';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    const query = `
      query Login($email: String!, $password: String!) {
        login(email: $email, password: $password) 
      }
    `;
    return this.http.post<any>(this.apiUrl, {
      query,
      variables: { email, password }
    });
  }

  signup(username: string, email: string, password: string) {
    const query = `
      mutation Signup($username: String!, $email: String!, $password: String!) {
        signup(username: $username, email: $email, password: $password) {
          _id
          username
          email
        }
      }
    `;
    return this.http.post<any>(this.apiUrl, {
      query,
      variables: { username, email, password }
    });
  }
  

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }
}
