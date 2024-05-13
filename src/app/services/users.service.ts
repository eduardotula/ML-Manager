import { Injectable } from "@angular/core";
import { CommonService } from "./common.service";
import { Observable, catchError } from "rxjs";
import { User } from "./models/User";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class UsersServices extends CommonService{

    url: string = 'https://ml-manager-back-b72bf0edf6c1.herokuapp.com/users/'
    

    getAll(): Observable<User[]>{
        return this.http.get<User[]>(this.url).pipe(catchError(this.handleError));
    }

    createUser(user: User): Observable<User>{
        return this.http.post<User>(this.url, user).pipe(catchError(this.handleError));
    }

    updateUser(user: User): Observable<User>{
        return this.http.put<User>(this.url, user).pipe(catchError(this.handleError));
    }
    
  }