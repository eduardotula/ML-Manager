import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { AnuncioVenda } from 'src/app/services/models/AnuncioVenda';
import { Order } from 'src/app/services/models/Order';
import { Venda } from 'src/app/services/models/Venda';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.scss'],
})
export class ListVendasComponent {
  @ViewChild('tables') table!: MatTable<Order>;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'alert',
    'vendasDescriptions',
    'custoTotal',
    'lucroTotal',
  ];

  vendaImgsMap : Map<Venda, string> = new Map();

  panelOpenState = false;
  dataSource = new MatTableDataSource<Order>([]);

  constructor(
    public orderService: OrderService,
    public lsUser: UserLSService,
    public router: Router
  ) {}

  ngAfterViewInit(): void {
    this.orderService
      .listByFilters(0, this.lsUser.getCurrentUser(), 'desc')
      .subscribe({
        next: (orders) => {
          this.dataSource.data = orders.results;

          orders.results.forEach((order) => {
            order.vendas.forEach((venda) => {
              if(venda.anuncio.fotoCapa){
                this.orderService.getImage(venda.anuncio.fotoCapa).subscribe({
                  next: (imgBlob) =>{
                    this.vendaImgsMap.set(venda, this.createImageFromBlob(imgBlob));
                  }
                });
              }
            });
          });
        },
        error: (error) => {},
      });
  }

  sumItemsInOrder(order: Order): number {
    return order.vendas.length;
  }

  sumLucroInOrder(order: Order): number {
    var lucroTotal = 0;
    order.vendas.forEach((venda) => (lucroTotal += venda.lucro));
    return lucroTotal;
  }

  sumCustoInOrder(order: Order): number {
    var lucroTotal = 0;
    order.vendas.forEach((venda) => (lucroTotal += venda.custo));
    return lucroTotal;
  }

  checkIfOrderContainsIncompleteAnuncio(order: Order): boolean {
    var vendas = order.vendas.filter((venda) => !venda.anuncio.complete);
    if (vendas.length > 0) return true;

    return false;
  }

  clickEdit(anuncio: AnuncioVenda) {
    this.router.navigate(['/cadastrar-anuncio'], {
      queryParams: {
        mlId: anuncio.mlId,
      },
    });
  }

  createImageFromBlob(image: Blob): string {
    if (image.size > 0) {
      return URL.createObjectURL(image);
    }
    return '';
  }

  getImageForVenda(venda: Venda): any{
    return this.vendaImgsMap.get(venda);
  }

  getThumbForOder(order: Order): any{
    
  }
}
