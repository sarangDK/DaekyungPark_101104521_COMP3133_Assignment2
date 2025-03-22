import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GraphqlService {
  private apiUrl = 'https://daekyung-park-comp-3133-101104521-assignment1.vercel.app/graphql';

  constructor(private http: HttpClient) {}

  query(query: string, variables?: any) {
    return this.http.post<any>(this.apiUrl, {
      query,
      variables
    });
  }
  mutate(mutation: string, variables?: any) {
    return this.http.post<any>(this.apiUrl, { 
      query: mutation, variables });
  }
}
