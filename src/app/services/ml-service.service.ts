import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommonService } from './common.service';
import { Produto } from './models/Produto';
import { ProdutoSimple } from './models/ProdutoSimple';


@Injectable({
  providedIn: 'root'
})
export class MlServiceService extends CommonService{

  url: string = 'http://localhost:8080/produto/'

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  listAllActivesProdutosIds(): Observable<string[]>{
    return this.http.get<string[]>(this.url + "list/ml/active", this.httpOptions).pipe(catchError(this.handleError));
  }

  listAllActiveMlMinusRegistered(): Observable<string[]>{
    return this.http.get<string[]>(this.url + "list/ml/active/dife", this.httpOptions).pipe(catchError(this.handleError));
  }

  listAll(): Observable<Produto[]>{
    return this.http.get<Produto[]>(this.url + "all", this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getProdutoByMlId(mlId: String): Observable<Produto>{
    return this.http.get<Produto>(this.url + mlId, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  getProdutoByMlIdSearch(mlId: String): Observable<Produto>{
    return this.http.get<Produto>(this.url + mlId + "/search", this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createProdutoSearch(produto: ProdutoSimple): Observable<Produto>{
    return this.http.post<Produto>(this.url + "simple", produto).pipe(catchError(this.handleError));
  }

  updateProdutoSimple(produto: ProdutoSimple): Observable<Produto>{
    return this.http.put<Produto>(this.url + "simple", produto).pipe(catchError(this.handleError));
  }

  deleteProdutoById(id: number): Observable<null>{
    return this.http.delete<null>(this.url + id ).pipe(catchError(this.handleError));
  }

  updateProdutoSearchByMlId(mlId: string): Observable<Produto>{
    return this.http.put<Produto>(this.url + "/simple/" + mlId, {}).pipe(catchError(this.handleError));
  }

}
