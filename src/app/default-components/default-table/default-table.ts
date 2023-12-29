import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Searchable } from './Searchable';

@Injectable({
    providedIn: 'root',
})
export abstract class DefaultTableMethods<T extends Searchable> {

    public items: T[];
    public itemsTemp: Observable<T[]>;

    constructor(){
        this.items = [];
        this.itemsTemp = of([]);
    }

    search(text: string): T[] {
        return this.items.filter((items) => {
            const term = text.toLowerCase();
            return items.searchField.toLowerCase().includes(term);
        });
    }
}
