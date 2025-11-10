import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CounterService {
  private _reflectionCount = 0;

  get reflectionCount(): number {
    return this._reflectionCount;
  }

  incrementReflection(): number {
    this._reflectionCount += 1;
    return this._reflectionCount;
  }
}

