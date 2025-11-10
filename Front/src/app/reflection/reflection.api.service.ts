import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ReflectionApiService {
  constructor(private http: HttpClient) {}

  getImporters(): Observable<string[]> {
    return this.http.get<string[]>(`/api/reflection/importers`);
  }
}

