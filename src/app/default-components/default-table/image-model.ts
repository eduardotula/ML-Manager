import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Searchable } from './Searchable';

@Injectable({
    providedIn: 'root',
})
export class ImageModel<T> {

    anuncioImgsMap : Map<T, string> = new Map();

    addImage(identifier: T, image: Blob){
        this.anuncioImgsMap.set(identifier, this.createImageFromBlob(image));
    }

    getImage(identifier: T): string | undefined{
        return this.anuncioImgsMap.get(identifier);
    }

    private createImageFromBlob(image: Blob): string {
        if (image.size > 0) {
          return URL.createObjectURL(image);
        }
        return '';
      }
}
