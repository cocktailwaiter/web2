import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../cocktail';
import { CocktailService } from '../cocktail.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  cocktails: Cocktail[] = [];

  constructor(private cocktailService: CocktailService) { }

  ngOnInit() {
    this.getCocktails();
  }

  getCocktails(): void {
    this.cocktailService.getCocktails().subscribe((response) => {
      const cocktails = response['data'];
      this.cocktails = cocktails;
    });
  }
}
