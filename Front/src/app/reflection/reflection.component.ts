import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReflectionApiService } from './reflection.api.service';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-reflection',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container mt-4">
      <div class="mb-2 text-muted">Visitas a /reflection: {{ count }}</div>
      <div class="mb-3">
        <button class="btn btn-primary" (click)="load()" [disabled]="loading">
          {{ loading ? 'Cargando...' : 'Listar DLL de importers' }}
        </button>
      </div>

      <div *ngIf="error" class="alert alert-danger" role="alert">
        {{ error }}
      </div>

      <div *ngIf="!error && !loading && items && items.length === 0" class="alert alert-warning" role="alert">
        No se encontraron DLL válidas.
      </div>

      <ul *ngIf="!error && items && items.length > 0" class="list-group">
        <li *ngFor="let name of items" class="list-group-item">{{ name }}</li>
      </ul>
    </div>
  `
})
export class ReflectionComponent implements OnInit {
  items: string[] | null = null;
  loading = false;
  error: string | null = null;
  count = 0;

  constructor(private api: ReflectionApiService, private counter: CounterService) {}

  ngOnInit(): void {
    this.count = this.counter.reflectionCount;
  }

  load() {
    this.loading = true;
    this.error = null;
    this.api.getImporters().subscribe({
      next: (data) => {
        this.items = Array.isArray(data) ? data : [];
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.items = null;
        this.error = 'Error al consultar el backend.';
        console.error(err);
      }
    });
  }
}
