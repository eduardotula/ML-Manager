import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommonService } from './common.service';
import { Produto } from './models/Produto';


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

    

}
