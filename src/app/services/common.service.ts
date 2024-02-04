import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DateToStringPipe } from '../pipes/dateToString';

@Injectable({
  providedIn: 'root'
})
export abstract class CommonService {

  constructor(public http: HttpClient, public dateToString: DateToStringPipe){
}

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

}
