import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Customer } from './customer';

@Injectable({ providedIn: 'root' })
export class CustomerService {
  private baseUrl = 'http://localhost:8080/customers';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Customer[]> {
    return this.http.get<Customer[]>(this.baseUrl);
  }

  getById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.baseUrl}/${id}`);
  }

  create(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(this.baseUrl, customer);
  }

  update(id: number, customer: Customer): Observable<Customer> {
    return this.http.put<Customer>(`${this.baseUrl}/${id}`, customer);
  }

  delete(id: number): Observable<string> {
    console.debug('[CustomerService] delete()', id);
    // Backend returns a plain text confirmation (not JSON). Request text to avoid parse errors.
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' }).pipe(
      tap(res => console.debug('[CustomerService] delete response', res))
    );
  }

  searchByEmail(emailId: string): Observable<Customer> {
    const params = new HttpParams().set('emailId', emailId);
    return this.http.get<Customer>(`${this.baseUrl}/search`, { params });
  }
}
