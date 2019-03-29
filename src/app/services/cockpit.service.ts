import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CockpitService {
  private url = 'http://agmstudio.io/cockpit/api/collections/get/posts';
  private token = '80b648038e27d185af9934d1bce142';

  constructor(
    private http: HttpClient
  ) { }

  getAllPosts() {

    const headers = new HttpHeaders({
      'Cockpit-Token': this.token
    });

    const body = {
      filter: { published: true },
      simple: 1
    };

    return this.http.post(this.url, body, { headers });
  }
}
