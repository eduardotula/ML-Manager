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

  url: string = 'http://localhost:8080/anuncios/'

  constructor(
    private http: HttpClient
  ) {
    super();
  }

  listAllActivesAnunciosIds(userId: number): Observable<string[]>{
    var params = {
      "user-id": userId,
    };
    return this.http.get<string[]>(this.url + "status-active",{params:params}).pipe(catchError(this.handleError));
  }

  listAllActiveMlMinusRegistered(userId: number): Observable<string[]>{
    var params = {
      "user-id": userId,
    };
    return this.http.get<string[]>(this.url + "list-all-active-minus-registered", {params:params}).pipe(catchError(this.handleError));
  }

  listAll(userId: number, registered: boolean): Observable<Anuncio[]>{
    var params = {
      "user-id": userId,
      "registered": registered
    };
    return this.http.get<Anuncio[]>(this.url, {params:params}).pipe(
      catchError(this.handleError)
    );
  }

  getAnuncioByMlId(mlId: String, userId: number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.get<Anuncio>(this.url + `mlId/${mlId}`, {params:params}).pipe(
      catchError(this.handleError)
    );
  }
  
  getAnuncioByMlIdSearch(mlId: String, userId:number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.get<Anuncio>(this.url +`/mlId/${mlId}/ml-api`, {params:params}).pipe(
      catchError(this.handleError)
    );
  }

  createAnuncioSearch(anuncio: AnuncioSimple, userId:number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.post<Anuncio>(this.url + "simple", anuncio, {params}).pipe(catchError(this.handleError));
  }

  updateAnuncioSimple(anuncio: AnuncioSimple, userId:number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.put<Anuncio>(this.url + "simple", anuncio, {params}).pipe(catchError(this.handleError));
  }

  deleteById(id: number): Observable<null>{
    return this.http.delete<null>(this.url + id ).pipe(catchError(this.handleError));
  }

  updateAnuncioSearchByMlId(mlId: string, userId:number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.put<Anuncio>(this.url + `${mlId}/search`, {params}).pipe(catchError(this.handleError));
  }

}
