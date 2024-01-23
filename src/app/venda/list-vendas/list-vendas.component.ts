import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { Order } from 'src/app/services/models/Order';
import { OrderService } from 'src/app/services/order.service';

@Component({
    selector: 'list-vendas',
    templateUrl: './list-vendas.component.html',
    styleUrls: ['./list-vendas.component.scss']
})
export class ListVendasComponent {

    @ViewChild("tables") table!: MatTable<Order>;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = ['id', "aa"];

    panelOpenState = false;
    dataSource = new MatTableDataSource<Order>([]);

    constructor(public orderService: OrderService, public lsUser: UserLSService) {
    }

    ngAfterViewInit(): void {
        this.orderService.listByFilters(0, this.lsUser.getCurrentUser(), "desc").subscribe({
            next: (orders) => {
                this.dataSource.data = orders.results;
            }, error: (error) => {
                
            }
        })
     }
}
