import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Cocktail } from '../cocktail';
import { CocktailService } from '../cocktail.service';

@Component({
  selector: 'app-cocktail-search',
  templateUrl: './cocktail-search.component.html',
  styleUrls: [ './cocktail-search.component.scss' ]
})
export class CocktailSearchComponent implements OnInit {
  cocktails$: Observable<Cocktail[]>;
  private searchTerms = new Subject<string>();

  constructor(private cocktailService: CocktailService) {}

  // 検索語をobservableストリームにpushする
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cocktails$ = this.searchTerms.pipe(
      // 各キーストロークの後、検索前に300ms待つ
      debounceTime(300),

      // 直前の検索語と同じ場合は無視する
      distinctUntilChanged(),

      // 検索語が変わる度に、新しい検索observableにスイッチする
      switchMap((term: string) => this.cocktailService.searchCocktails(term)),
    );
  }
}
