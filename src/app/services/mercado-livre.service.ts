import { Injectable } from '@angular/core';
import { Anuncio } from './models/Anuncio';
import { CommonService } from './common.service';
import { Observable, catchError, from, map, of } from 'rxjs';
import { MercadoLivreAnuncio } from './models/MercadoLivreAnuncio';

@Injectable({
    providedIn: 'root'
})
export class MercadoLivreService extends CommonService{

    url: string = "https://api.mercadolibre.com/items/";

    getAnuncioByMlId(mlId: string): Observable<MercadoLivreAnuncio>{
        return this.http.get<MercadoLivreAnuncio>(`${this.url}${mlId}`).pipe(
            catchError(this.handleError)
          );
    }

}