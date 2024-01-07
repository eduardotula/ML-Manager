import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommonService } from './common.service';
import { Anuncio } from './models/Anuncio';
import { AnuncioSimple } from './models/AnuncioSimple';


@Injectable({
  providedIn: 'root'
})
export class MlServiceService extends CommonService{

  url: string = 'http://localhost:8080/anuncio/'

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  listAllActivesAnunciosIds(): Observable<string[]>{
    return this.http.get<string[]>(this.url + "list/ml/active", this.httpOptions).pipe(catchError(this.handleError));
  }

  listAllActiveMlMinusRegistered(): Observable<string[]>{
    return this.http.get<string[]>(this.url + "list/ml/active/dife", this.httpOptions).pipe(catchError(this.handleError));
  }

  listAll(): Observable<Anuncio[]>{
    return this.http.get<Anuncio[]>(this.url + "all", this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  getAnuncioByMlId(mlId: String): Observable<Anuncio>{
    return this.http.get<Anuncio>(this.url + mlId, this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }
  
  getAnuncioByMlIdSearch(mlId: String): Observable<Anuncio>{
    return this.http.get<Anuncio>(this.url + mlId + "/search", this.httpOptions).pipe(
      catchError(this.handleError)
    );
  }

  createAnuncioSearch(anuncio: AnuncioSimple): Observable<Anuncio>{
    return this.http.post<Anuncio>(this.url + "simple", anuncio).pipe(catchError(this.handleError));
  }

  updateAnuncioSimple(anuncio: AnuncioSimple): Observable<Anuncio>{
    return this.http.put<Anuncio>(this.url + "simple", anuncio).pipe(catchError(this.handleError));
  }

  deleteAnuncioById(id: number): Observable<null>{
    return this.http.delete<null>(this.url + id ).pipe(catchError(this.handleError));
  }

  updateAnuncioSearchByMlId(mlId: string): Observable<Anuncio>{
    return this.http.put<Anuncio>(this.url + "/simple/" + mlId, {}).pipe(catchError(this.handleError));
  }

}
