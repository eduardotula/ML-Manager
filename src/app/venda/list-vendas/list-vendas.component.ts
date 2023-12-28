import { Component, OnInit } from '@angular/core';
import { DefaultTableMethods } from 'src/app/default-components/default-table/default-table';
import { Venda } from 'src/app/services/models/Venda';

@Component({
    selector: 'list-vendas',
    templateUrl: './list-vendas.component.html',
    styleUrls: ['./list-vendas.component.scss']
})
export class ListVendasComponent extends DefaultTableMethods<Venda> implements OnInit {
    constructor() {
        super();
    }

    ngOnInit(): void { }
}
