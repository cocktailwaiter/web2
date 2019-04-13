import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Cocktail }         from '../cocktail';
import { CocktailService }  from '../cocktail.service';

@Component({
  selector: 'app-cocktail-detail',
  templateUrl: './cocktail-detail.component.html',
  styleUrls: [ './cocktail-detail.component.scss' ]
})
export class CocktailDetailComponent implements OnInit {
  @Input() cocktail: Cocktail;

  constructor(
    private route: ActivatedRoute,
    private cocktailService: CocktailService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCocktail();
  }

  getCocktail(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.cocktailService.getCocktail(id)
      .subscribe(cocktail => this.cocktail = cocktail);
  }

  goBack(): void {
    this.location.back();
  }

 save(): void {
    this.cocktailService.updateCocktail(this.cocktail)
      .subscribe(() => this.goBack());
  }
}
