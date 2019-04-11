import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Cocktail } from './cocktail';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const cocktails = [
      { id: 11, name: 'Mr. Nice' },
      { id: 12, name: 'Narco' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    return {cocktails};
  }

  // Overrides the genId method to ensure that a cocktail always has an id.
  // If the cocktails array is empty,
  // the method below returns the initial number (11).
  // if the cocktails array is not empty, the method below returns the highest
  // cocktail id + 1.
  genId(cocktails: Cocktail[]): number {
    return cocktails.length > 0 ? Math.max(...cocktails.map(cocktail => cocktail.id)) + 1 : 11;
  }
}
