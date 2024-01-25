import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { HttpClient } from "@angular/common/http";
import { Observable, catchError } from "rxjs";
import { Order } from "./models/Order";
import { PaginationResponse } from "./models/PaginationResponse";

@Injectable({
    providedIn: 'root'
  })
  export class OrderService extends CommonService{

    url: string = 'http://localhost:8080/orders/'



    listByFilters(page: number, userId: number, sortType: string): Observable<PaginationResponse<Order>>{
      var params = {
        "user-id": userId,
        "sortType": "desc"
      }
      return this.http.get<PaginationResponse<Order>>(this.url + "", {params}).pipe(catchError(this.handleError));
    }

    
  }