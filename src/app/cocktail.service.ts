import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cocktail } from './cocktail';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class CocktailService {

  private cocktailsUrl = 'api/cocktails';  // Web APIのURL

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** サーバーからヒーローを取得する */
  getCocktails (): Observable<Cocktail[]> {
    return this.http.get<Cocktail[]>(this.cocktailsUrl)
      .pipe(
        tap(cocktails => this.log('fetched cocktails')),
        catchError(this.handleError<Cocktail[]>('getCocktails', []))
      );
  }

  /** IDによりヒーローを取得する。idが見つからない場合は`undefined`を返す。 */
  getCocktailNo404<Data>(id: number): Observable<Cocktail> {
    const url = `${this.cocktailsUrl}/?id=${id}`;
    return this.http.get<Cocktail[]>(url)
      .pipe(
        map(cocktails => cocktails[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} cocktail id=${id}`);
        }),
        catchError(this.handleError<Cocktail>(`getCocktail id=${id}`))
      );
  }

  /** IDによりヒーローを取得する。見つからなかった場合は404を返却する。 */
  getCocktail(id: number): Observable<Cocktail> {
    const url = `${this.cocktailsUrl}/${id}`;
    return this.http.get<Cocktail>(url).pipe(
      tap(_ => this.log(`fetched cocktail id=${id}`)),
      catchError(this.handleError<Cocktail>(`getCocktail id=${id}`))
    );
  }

  /* 検索語を含むヒーローを取得する */
  searchCocktails(term: string): Observable<Cocktail[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のヒーロー配列を返す
      return of([]);
    }
    return this.http.get<Cocktail[]>(`${this.cocktailsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found cocktails matching "${term}"`)),
      catchError(this.handleError<Cocktail[]>('searchCocktails', []))
    );
  }

  //////// Save methods //////////

  /** POST: サーバーに新しいヒーローを登録する */
  addCocktail (cocktail: Cocktail): Observable<Cocktail> {
    return this.http.post<Cocktail>(this.cocktailsUrl, cocktail, httpOptions).pipe(
      tap((newCocktail: Cocktail) => this.log(`added cocktail w/ id=${newCocktail.id}`)),
      catchError(this.handleError<Cocktail>('addCocktail'))
    );
  }

  /** DELETE: サーバーからヒーローを削除 */
  deleteCocktail (cocktail: Cocktail | number): Observable<Cocktail> {
    const id = typeof cocktail === 'number' ? cocktail : cocktail.id;
    const url = `${this.cocktailsUrl}/${id}`;

    return this.http.delete<Cocktail>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted cocktail id=${id}`)),
      catchError(this.handleError<Cocktail>('deleteCocktail'))
    );
  }

  /** PUT: サーバー上でヒーローを更新 */
  updateCocktail (cocktail: Cocktail): Observable<any> {
    return this.http.put(this.cocktailsUrl, cocktail, httpOptions).pipe(
      tap(_ => this.log(`updated cocktail id=${cocktail.id}`)),
      catchError(this.handleError<any>('updateCocktail'))
    );
  }

  /**
   * 失敗したHttp操作を処理します。
   * アプリを持続させます。
   * @param operation - 失敗した操作の名前
   * @param result - observableな結果として返す任意の値
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: リモート上のロギング基盤にエラーを送信する
      console.error(error); // かわりにconsoleに出力

      // TODO: ユーザーへの開示のためにエラーの変換処理を改善する
      this.log(`${operation} failed: ${error.message}`);

      // 空の結果を返して、アプリを持続可能にする
      return of(result as T);
    };
  }

  /** CocktailServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`CocktailService: ${message}`);
  }
}
