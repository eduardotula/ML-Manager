import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ListVendas } from '../listVendas';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Venda } from 'src/app/services/models/Venda';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'vendas-detail',
    templateUrl: 'vendas-detail.component.html',
    styleUrls: ['vendas-detail.component.scss'],
})

export class VendasDetailComponent implements OnInit {

    listVendas: ListVendas;
    vendas: Venda[];
    displayedColumns: string[] = ["status","createdAt","quantidade", "custo", "custoFrete","imposto","taxaML", "precoDesconto", "lucro"];
    @ViewChild("tables") table!: MatTable<Venda>;
    @ViewChild(MatSort) sort!: MatSort;
    dataSource = new MatTableDataSource<Venda>([]);


    constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
        this.listVendas = data.vendas;
        this.vendas = this.listVendas.vendas;

     }
    ngOnInit() {         
        this.dataSource.sort = this.sort;
        this.dataSource.data = this.vendas;}
}