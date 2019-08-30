import { Component, OnInit } from '@angular/core';
import { Cocktail } from '../cocktail';
import { CocktailService } from '../cocktail.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

import * as cloneDeep from 'clone-deep';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent implements OnInit {
  cocktails: Cocktail[] = [];

  private queryParams: any;

  constructor(
    private cocktailService: CocktailService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    let tmpQueryParams = {};

    this.activatedRoute.queryParams.subscribe(
      (params: ParamMap) => {
        tmpQueryParams = params;
      }
    );

    this.queryParams = cloneDeep(tmpQueryParams);

    const seed = moment().unix().toString(); // Seed値としてエポックタイムを使用
    this.queryParams.seed = seed;

    this.getCocktails(this.queryParams);
  }

  getCocktails(params): void {
    this.cocktailService.getCocktails(params).subscribe((response) => {
      const cocktails = response['data'];
      this.cocktails = cocktails;
    });
  }
}
