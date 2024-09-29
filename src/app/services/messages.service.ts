import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { CommonService } from './common.service';
import { Anuncio } from './models/Anuncio';
import { AnuncioSimple } from './models/AnuncioSimple';
import { AnuncioSimulation } from './models/AnuncioSimulation';
import { environment } from 'src/environments/environment';
import { Message } from './models/Message';


@Injectable({
  providedIn: 'root'
})
export class MessagesService extends CommonService{
  
  url: string = environment.apiUrl + '/messages/'

  listAll(): Observable<Message[]>{
    return this.http.get<Message[]>(this.url).pipe(
      catchError(this.handleError)
    );
  }

  deleteById(id: number): Observable<null>{
    return this.http.delete<null>(this.url + id ).pipe(catchError(this.handleError));
  }


}
