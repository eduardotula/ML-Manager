import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Observable, expand, forkJoin, from } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { Venda } from 'src/app/services/models/Venda';
import { OrderService } from 'src/app/services/order.service';
import { ListVendas } from './listVendas';
import { MatSort } from '@angular/material/sort';
import { ImageModel } from 'src/app/default-components/default-table/image-model';
import { Anuncio } from 'src/app/services/models/Anuncio';
import { ImageMLService } from 'src/app/services/image-ml.service';
import { FilterDateData } from '../components/filter-date/filter-date.data';
import { data } from 'jquery';

@Component({
    selector: 'list-vendas',
    templateUrl: './list-vendas.component.html',
    styleUrls: ['./list-vendas.component.scss']
})
export class ListVendasComponent {

    @ViewChild('tables') table!: MatTable<ListVendas>;
    @ViewChild(MatSort) sort!: MatSort;
    displayedColumns: string[] = [
        "img",
        "descricao",
        "quantidade",
        "somaVenda",
      'somaLucro'
    ];
    dataSource = new MatTableDataSource<ListVendas>([]);
    errorMsg = "";
    loading: boolean = false;
    anuncioImg: ImageModel<Anuncio> = new ImageModel<Anuncio>();
    initialDate: Date;
    finalDate: Date;

    constructor(private anuncioService: AnuncioService, private orderService: OrderService, private userLsService: UserLSService, private imgService: ImageMLService) {
        const currentDate = new Date();
        this.initialDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        this.finalDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
     }

     ngOnInit(): void {
        this.populateTable(this.initialDate, this.finalDate)
    }

    populateTable(dataInicial: Date| null, dataFinal: Date|null){
        this.loading = true;
        this.anuncioService.listAll(this.userLsService.getCurrentUser(), true).subscribe({
            next: (anuncios) => {

                const requests: Observable<Venda[]>[] = [];
                let listVenda: ListVendas[] = [];
                anuncios.forEach((anuncio) => {
                    requests.push(from(this.listAllVendasByFilters(anuncio.id, "ASC", dataInicial, dataFinal)));
                    listVenda.push(new ListVendas(anuncio, []));
                    
                    if(anuncio.pictures.length > 0){
                        this.imgService.getImage(anuncio.pictures[0].url).subscribe((imgBlob) => this.anuncioImg.addImage(anuncio, imgBlob));
                    }
                })
                this.dataSource.sort = this.sort;
                this.dataSource.data = listVenda;
                this.table.renderRows();
                this.loading = false;
                this.observeVendas(requests);
            },
            error: (error) => {
                this.handleError(error);
            }
        })
    }

    async listAllVendasByFilters(anuncioId: number, sortType: string, dataInicial: Date | null, dataFinal: Date | null): Promise<Venda[]> {
        var totalPages = 1;
        var page = 0;

        var vendas: Venda[] = [];

        while (page < totalPages) {
            var response = await this.orderService.listVendasByFilters(page, anuncioId, sortType, dataInicial, dataFinal, false).toPromise();
            if (!response) throw Error("Falha ao buscar vendas");

            response.results.forEach((v) => vendas.push(v))
            totalPages = response.metaInfo.pageInfo.totalPages!;
            page++;
        }

        return vendas;
    }

    observeVendas(requests: Observable<Venda[]>[]) {
        forkJoin(requests).subscribe({
            next: (resultsVendas) => {
                this.loading = true;
                resultsVendas.forEach(vendas => {
                    if(vendas.length > 0){
                        var anuncios = this.dataSource.data.filter(listVendas => listVendas.anuncio.id == vendas[0].anuncio.id)
                        if (anuncios.length > 0) {
                            anuncios[0].vendas = vendas;
                            anuncios[0].sumValues();
                        }
                    }
                })
                this.loading = false;
            },
            error: (error) => {
                this.handleError(error);
            }
        })
    }

    onSubmitDate(datas: FilterDateData){
        this.populateTable(datas.dataInicial, datas.dataFinal);
    }

    handleError(error: any){
        this.loading = false;
        console.log(error.message);
        this.errorMsg = error.message;
    }
    
    applyFilters(text: string){
        this.dataSource.filter = text;
    }

    sumLucro(){
        var sum = 0;
        this.dataSource.filteredData.forEach(data =>{
            sum += data.somaLucro;
        });
        return sum;
    }
    
    sumVendaTotal(){
        var sum = 0;
        this.dataSource.filteredData.forEach(data =>{
            sum += data.somaVenda;
        });
        return sum;
    }
}
