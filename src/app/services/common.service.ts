import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService {

  handleError(error: HttpErrorResponse) {
    let status!: number;
    let msg!: string;
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      status = error.status;
      msg = error.error && error.error.message ? error.error.message : 'Algo de errado aconteceu. Por favor, tente novamente.';
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a person-facing error message
    return throwError({status:status, message:msg, error:error.error});
  }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      'Access-Control-Allow-Headers': 'Content-Type',
    }),
  };

}
