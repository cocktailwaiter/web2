import { Component, OnInit } from '@angular/core';

import { Cocktail } from '../cocktail';
import { CocktailService } from '../cocktail.service';

@Component({
  selector: 'app-cocktails',
  templateUrl: './cocktails.component.html',
  styleUrls: ['./cocktails.component.css']
})
export class CocktailsComponent implements OnInit {
  cocktails: Cocktail[];

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
    this.getCocktails();
  }

  getCocktails(): void {
    this.cocktailService.getCocktails()
    .subscribe(cocktails => this.cocktails = cocktails);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.cocktailService.addCocktail({ name } as Cocktail)
      .subscribe(cocktail => {
        this.cocktails.push(cocktail);
      });
  }

  delete(cocktail: Cocktail): void {
    this.cocktails = this.cocktails.filter(h => h !== cocktail);
    this.cocktailService.deleteCocktail(cocktail).subscribe();
  }

}
