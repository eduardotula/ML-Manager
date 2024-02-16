import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommonService } from './common.service';
import { Anuncio } from './models/Anuncio';
import { AnuncioSimple } from './models/AnuncioSimple';
import { AnuncioSimulation } from './models/AnuncioSimulation';


@Injectable({
  providedIn: 'root'
})
export class AnuncioService extends CommonService{

  url: string = 'http://localhost:8080/anuncios/'


  listAllAnunciosMercadoLivre(userId: number, includePaused: boolean): Observable<string[]>{
    var params = {
      "user-id": userId,
      "include-paused": includePaused
    };

    return this.http.get<string[]>(this.url + "mercado-livre", {params:params}).pipe(catchError(this.handleError));
  }

  listAll(userId: number, complete: boolean): Observable<Anuncio[]>{
    var params = {
      "user-id": userId,
      "complete": complete
    };
    return this.http.get<Anuncio[]>(this.url, {params:params}).pipe(
      catchError(this.handleError)
    );
  }

  getAnuncioByMlId(mlId: String, userId: number, complete: boolean): Observable<Anuncio>{
    var params = {
      "user-id": userId,
      "complete": complete
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
    return this.http.post<Anuncio>(this.url , anuncio, {params}).pipe(catchError(this.handleError));
  }

  updateAnuncioSimple(anuncio: AnuncioSimple, userId:number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.put<Anuncio>(this.url , anuncio, {params}).pipe(catchError(this.handleError));
  }

  deleteById(id: number): Observable<null>{
    return this.http.delete<null>(this.url + id ).pipe(catchError(this.handleError));
  }

  updateAnuncioSearchByMlId(mlId: string, userId:number): Observable<Anuncio>{
    var params = {
      "user-id": userId,
    };
    return this.http.put<Anuncio>(this.url + `${mlId}/search`, {}, {params}).pipe(catchError(this.handleError));
  }

  simulateAnuncio(anuncioSimulation: AnuncioSimulation, userId: number): Observable<any>{
    var params = {
      "categoria": anuncioSimulation.categoria,
      "valor-venda": anuncioSimulation.valorVenda,
      "custo": anuncioSimulation.custo,
      "custo-frete": anuncioSimulation.custoFrete,
      "csosn": anuncioSimulation.csosn,
      "tipo-anuncio": anuncioSimulation.tipoAnuncio,
      "user-id": userId,
    };
    return this.http.get<any>(this.url + `simulation`, {params}).pipe(catchError(this.handleError));
  } 

}
