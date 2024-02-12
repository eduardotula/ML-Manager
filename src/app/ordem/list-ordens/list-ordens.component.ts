import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ImageModel } from 'src/app/default-components/default-table/image-model';
import { ImageMLService } from 'src/app/services/image-ml.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { AnuncioVenda } from 'src/app/services/models/AnuncioVenda';
import { PageInfo } from 'src/app/services/models/MetaInfo';
import { Order } from 'src/app/services/models/Order';
import { Venda } from 'src/app/services/models/Venda';
import { OrderService } from 'src/app/services/order.service';
import { FilterDateData } from '../components/filter-date/filter-date.data';

@Component({
  selector: 'list-vendas',
  templateUrl: './list-ordens.component.html',
  styleUrls: ['./list-ordens.component.scss'],
})
export class ListOrdensComponent {
  @ViewChild('table') table!: MatTable<Order>;
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  displayedColumns: string[] = [
    "descricao",
    'custoTotal',
    'lucroTotal',
  ];

  errorMsg!: string;
  loading: boolean = false;
  panelOpenState = false;
  anuncioImage: ImageModel<Venda>;
  dataSource = new MatTableDataSource<Order>([]);
  initialDate: Date;
  finalDate: Date;
  pagination: PageInfo = new PageInfo();
  filters!: FilterDateData;

  constructor(
    public orderService: OrderService,
    public lsUser: UserLSService,
    public router: Router,
    private imgService: ImageMLService,
  ) {
    const currentDate = new Date();
    this.initialDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    this.finalDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    this.anuncioImage = new ImageModel<Venda>();
  }

  ngOnInit(): void {
    this.filters = new FilterDateData(this.initialDate, this.finalDate, "");
    this.populateTable(this.filters);
  }

  onSubmitDate(filters: FilterDateData){
    this.filters = filters;
    this.populateTable(filters);
  }

  populateTable(filter: FilterDateData){
    this.loading = true;
    this.dataSource.sort = this.sort;
    this.orderService
      .listByFilters(this.pagination.page, this.lsUser.getCurrentUser(), 'DESC', filter.dataInicial, filter.dataFinal, {descricao: filter.text})
      .subscribe({
        next: (orders) => {
          this.dataSource.data = orders.results;
          this.pagination = orders.metaInfo.pageInfo;
          this.table.renderRows();
          this.loading = false;

          orders.results.forEach((order) => {
            order.vendas.forEach((venda) => {
              if(venda.anuncio.fotoCapa){
                this.loading = true;
                this.imgService.getImage(venda.anuncio.fotoCapa).subscribe({
                  next: (imgBlob) =>{
                    this.anuncioImage.addImage(venda, imgBlob);
                    this.loading = false;
                  },
                  error: (error) => {
                    this.handleError(error);

                  },
                });
              }
            });
          });
        },
        error: (error) => {
          this.handleError(error);
        },
      });
  }

  handleError(error: any){
    this.loading = false;
    console.log(error.message);
    this.errorMsg = error.message;
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

  nextPage(){
    if(this.pagination.page < this.pagination.totalPages-1){
      this.pagination.page += 1;
      this.populateTable(this.filters);
    }
  }

  previusPage(){
    if(this.pagination.page > 0){
      this.pagination.page -= 1;
      this.populateTable(this.filters);
    } 
  }

}
