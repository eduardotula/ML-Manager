import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { Observable, catchError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ImageMLService extends CommonService{
    
    getImage(url: string): Observable<Blob> {
        // Set the response type to 'blob' to handle binary data (like images)
        return this.http.get(url, { responseType: 'blob' }).pipe(catchError(this.handleError));
      }
      

}