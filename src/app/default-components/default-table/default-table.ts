import { Injectable } from '@angular/core';
import { Searchable } from './Searchable';
import { Observable } from 'rxjs';
import { Produto } from 'src/app/services/models/Produto';

@Injectable({
    providedIn: 'root',
})
export abstract class DefaultTableMethods<T extends Searchable> {

    public items: T[];
    public itemsTemp!: Observable<T[]>;

    constructor(){
        this.items = [];
    }

    search(text: string): T[] {
        return this.items.filter((items) => {
            const term = text.toLowerCase();
            return items.searchField.toLowerCase().includes(term);
        });
    }
}
