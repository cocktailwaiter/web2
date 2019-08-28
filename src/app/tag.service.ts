import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { environment } from '../environments/environment'
import { Tag } from './tag';
import { MessageService } from './message.service';

import * as moment from 'moment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TagService {

  private tagsUrl = `${environment.CWApiUrlBase}/v1/tags`;

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** サーバーからカクテルを取得する */
  getTags (): Observable<Tag[]> {
    const seed = moment().unix().toString(); // Seed値としてエポックタイムを使用
    const params = new HttpParams().set('seed', seed);
    const options = {params};
    return this.http.get<Tag[]>(this.tagsUrl, options)
      .pipe(
        tap(tags => this.log('fetched tags')),
        catchError(this.handleError<Tag[]>('getTags', []))
      );
  }

  /** IDによりカクテルを取得する。idが見つからない場合は`undefined`を返す。 */
  getTagNo404<Data>(id: number): Observable<Tag> {
    const url = `${this.tagsUrl}/?id=${id}`;
    return this.http.get<Tag[]>(url)
      .pipe(
        map(tags => tags[0]), // {0|1} 要素の配列を返す
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} tag id=${id}`);
        }),
        catchError(this.handleError<Tag>(`getTag id=${id}`))
      );
  }

  /** IDによりカクテルを取得する。見つからなかった場合は404を返却する。 */
  getTag(id: number): Observable<Tag> {
    const url = `${this.tagsUrl}/${id}`;
    return this.http.get<Tag>(url).pipe(
      tap(_ => this.log(`fetched tag id=${id}`)),
      catchError(this.handleError<Tag>(`getTag id=${id}`))
    );
  }

  /* 検索語を含むカクテルを取得する */
  searchTags(term: string): Observable<Tag[]> {
    if (!term.trim()) {
      // 検索語がない場合、空のカクテル配列を返す
      return of([]);
    }
    return this.http.get<Tag[]>(`${this.tagsUrl}/?name=${term}`).pipe(
      tap(_ => this.log(`found tags matching "${term}"`)),
      catchError(this.handleError<Tag[]>('searchTags', []))
    );
  }

  //////// Save methods //////////

  // /** POST: サーバーに新しいカクテルを登録する */
  // addCocktail (cocktail: Cocktail): Observable<Tag> {
  //   return this.http.post<Tag>(this.tagsUrl, cocktail, httpOptions).pipe(
  //     tap((newCocktail: Cocktail) => this.log(`added cocktail w/ id=${newCocktail.id}`)),
  //     catchError(this.handleError<Tag>('addCocktail'))
  //   );
  // }

  // /** DELETE: サーバーからカクテルを削除 */
  // deleteCocktail (cocktail: Cocktail | number): Observable<Tag> {
  //   const id = typeof cocktail === 'number' ? cocktail : cocktail.id;
  //   const url = `${this.tagsUrl}/${id}`;

  //   return this.http.delete<Tag>(url, httpOptions).pipe(
  //     tap(_ => this.log(`deleted cocktail id=${id}`)),
  //     catchError(this.handleError<Tag>('deleteCocktail'))
  //   );
  // }

  // /** PUT: サーバー上でカクテルを更新 */
  // updateCocktail (cocktail: Cocktail): Observable<any> {
  //   return this.http.put(this.tagsUrl, cocktail, httpOptions).pipe(
  //     tap(_ => this.log(`updated cocktail id=${cocktail.id}`)),
  //     catchError(this.handleError<any>('updateCocktail'))
  //   );
  // }

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

  /** TagServiceのメッセージをMessageServiceを使って記録 */
  private log(message: string) {
    this.messageService.add(`TagService: ${message}`);
  }
}
