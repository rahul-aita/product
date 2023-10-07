import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Grocery } from '../dto/type';

@Injectable({
  providedIn: 'root'
})
export class GroceryService {
 
  private baseUrl = 'http://localhost:3000/posts';

  constructor(private http: HttpClient) {}

  getGrocery() {
    return this.http.get<Grocery[]>(this.baseUrl);
  }

  postGrocery(grocery: Grocery) {
    return this.http.post<Grocery>(this.baseUrl, grocery);
  }

  deleteGrocery(id: string) {
    return this.http.delete(this.baseUrl + '/' + id);
  }
}
