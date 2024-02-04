import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ImageModel } from 'src/app/default-components/default-table/image-model';
import { ImageMLService } from 'src/app/services/image-ml.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { AnuncioVenda } from 'src/app/services/models/AnuncioVenda';
import { Order } from 'src/app/services/models/Order';
import { Venda } from 'src/app/services/models/Venda';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'list-vendas',
  templateUrl: './list-ordens.component.html',
  styleUrls: ['./list-ordens.component.scss'],
})
export class ListOrdensComponent {
  @ViewChild('tables') table!: MatTable<Order>;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = [
    'alert',
    'vendasDescriptions',
    'custoTotal',
    'lucroTotal',
  ];

  errorMsg!: string;
  loading: boolean = false;
  panelOpenState = false;
  anuncioImage: ImageModel<Venda>;
  dataSource = new MatTableDataSource<Order>([]);

  constructor(
    public orderService: OrderService,
    public lsUser: UserLSService,
    public router: Router,
    private imgService: ImageMLService
  ) {
    this.anuncioImage = new ImageModel<Venda>();
  }

  ngAfterViewInit(): void {
    this.populateTable(null, null);
  }

  onSubmitDate(filters: any){
    this.populateTable(filters.dataInicial, filters.dataFinal);
  }

  populateTable(dataInicial: Date | null, dataFinal: Date| null){
    this.loading = true;
    this.orderService
      .listByFilters(0, this.lsUser.getCurrentUser(), 'desc', dataInicial, dataFinal)
      .subscribe({
        next: (orders) => {
          this.dataSource.data = orders.results;

          orders.results.forEach((order) => {
            order.vendas.forEach((venda) => {
              if(venda.anuncio.fotoCapa){
                this.imgService.getImage(venda.anuncio.fotoCapa).subscribe({
                  next: (imgBlob) =>{
                    this.anuncioImage.addImage(venda, imgBlob);
                    this.loading = false;
                  },
                  error: (error) => {
                    this.loading = false;
                    console.log(error.message);
                    this.errorMsg = error.message;
                  },
                });
              }
            });
          });
        },
        error: (error) => {
          this.loading = false;
          console.log(error.message);
          this.errorMsg = error.message;
        },
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

  getImageForVenda(venda: Venda): any{
    return this.anuncioImage.getImage(venda);
  }

  getThumbForOder(order: Order): any{
    
  }
}
