import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { Observable, catchError } from "rxjs";
import { Order } from "./models/Order";
import { PaginationResponse } from "./models/PaginationResponse";
import { Venda } from "./models/Venda";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class OrderService extends CommonService{

    url: string = environment.apiUrl +'/orders/'

    listByFilters(page: number, userId: number, sortType: string, dataInicial: Date | null, dataFinal: Date | null, 
      filters?: {
        descricao: string;
      },
      ): Observable<PaginationResponse<Order>>{
      var params = {
        "user-id": userId,
        "sortType": sortType,
        "page": page,
      }
      Object.assign(params,filters);
      if(dataInicial && dataFinal){
        Object.assign(params, {dataInicial: this.dateToString.transform(dataInicial), dataFinal: this.dateToString.transform(dataFinal)})
      }
      return this.http.get<PaginationResponse<Order>>(this.url + "", {params}).pipe(catchError(this.handleError));
    }

    listVendasByFilters(page: number, anuncioId: number, sortType: string, dataInicial: Date| null, dataFinal: Date| null, includeCancelled: boolean): Observable<PaginationResponse<Venda>>{
      var params = {
        "sortType": sortType,
        "page": page,
        "include-cancelled": includeCancelled
      }
      if(dataInicial && dataFinal){
        Object.assign(params, {dataInicial: this.dateToString.transform(dataInicial), dataFinal: this.dateToString.transform(dataFinal)})
      }
      return this.http.get<PaginationResponse<Venda>>(this.url + `/vendas/anuncios/${anuncioId}`, {params}).pipe(catchError(this.handleError));
    }
    
  }