import { Routes } from '@angular/router';
import { ReflectionComponent } from './reflection/reflection.component';
import { reflectionGuard } from './reflection/reflection.guard';
import { ConsignaComponent } from './shared/components/consigna/consigna.component';

export const routes: Routes = [
  { path: '', component: ConsignaComponent },
  { path: 'reflection', component: ReflectionComponent, canActivate: [reflectionGuard] },
  { path: '**', redirectTo: '' },
];
