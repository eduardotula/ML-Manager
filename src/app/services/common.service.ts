import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { DateToStringPipe } from '../pipes/dateToString';

@Injectable({
  providedIn: 'root',
})
export abstract class CommonService {
  constructor(public http: HttpClient, public dateToString: DateToStringPipe) {}

  handleError(error: HttpErrorResponse) {
    let status!: number;
    let msg!: string;

    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong,
    status = error.status;
    msg = "Algo de errado aconteceu, por favor tente novamente"
    console.log(JSON.stringify(error.error));
    // return an observable with a person-facing error message
    return throwError({ status: status, message: msg, error: error.error });
  }
}
