import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { MlServiceService } from 'src/app/services/anuncios.service';
import { Anuncio } from 'src/app/services/models/Anuncio';
import * as ExcelJS from 'exceljs';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';

@Component({
  selector: 'app-list-anuncios',
  templateUrl: "./list-anuncios.component.html",
  styleUrls: ['./list-anuncios.component.scss'],
})
export class ListAnunciosComponent{

  @ViewChild("tables") table!: MatTable<Anuncio>;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<Anuncio>([]);
  loading: boolean = true;
  errorMsg: string = "";
  displayedColumns: string[] = ['id', 'mlId', "sku", "descricao", "custo", "venda", "taxaMl", "frete", "lucro","status", "edit", "update", "delete"];
  anuncioImgsMap : Map<Anuncio, string> = new Map();

  constructor(public service: MlServiceService,public lsUser: UserLSService, public router: Router) {
    this.errorMsg = ""
   }

   ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.service.listAll(this.lsUser.getCurrentUser(), true).subscribe({
      next: (prods) => {
        this.dataSource.data = prods;
        this.table.renderRows();
        this.loading = false;
        
        this.dataSource.data.forEach((anuncio) =>{
          if(anuncio.pictures.length > 0){
            this.service.getImage(anuncio.pictures[0].url).subscribe({
              next: (imgBlob) =>{
                this.anuncioImgsMap.set(anuncio, this.service.createImageFromBlob(imgBlob));
              }
            });
          }
        })
      }, error: (error) => this.errorMsg = error.message
    });
    
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAnuncioPage(url: string) {
    window.open(url);
  }

  clickEdit(anuncio: Anuncio) {
    this.router.navigate(["/cadastrar-anuncio"], {
      queryParams: {
        mlId: anuncio.mlId,
        custo: anuncio.custo,
        csosn: anuncio.csosn
      }
    });
  }

  clickDelete(anuncio: Anuncio) {
    this.service.deleteById(anuncio.id).subscribe({
      next: () => window.location.reload(),
      error: (err) => this.errorMsg = err.message

    });
  }

  clickUpdate(anuncio: Anuncio) {
    this.service.updateAnuncioSearchByMlId(anuncio.mlId, this.lsUser.getCurrentUser()).subscribe({
      next: () => window.location.reload(),
      error: (err) => this.errorMsg = err.message
    });
  }

  clickUpdateAll() {
    this.errorMsg = "";
    this.loading = true;

    const requests: Observable<Anuncio>[] = [];
    this.dataSource.filteredData.forEach((anunciosRegistrado)=>{
      requests.push(this.service.updateAnuncioSearchByMlId(anunciosRegistrado.mlId, this.lsUser.getCurrentUser()))
    });

    forkJoin(requests).subscribe(
      (results) => {
        window.location.reload();
      },
      (error) => {
        console.error('Error updating Anuncios:', error);
        this.errorMsg = 'Erro ao atualizar Anuncios';
        this.loading = false;
      }
    );
  }

  exportToExcel(){
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet("Anuncios");
    var columns = [
      { name: 'mlId', width: 14 },
      { name: 'sku',  width: 20 },
     // { name: 'gtin',  width: 13 },
      { name: 'url', width: 10 },
      { name: 'Descrição', width: 60 },
      { name: 'Categoria',  width: 12 },
      { name: 'Custo',  width: 14 },
      { name: 'Venda', width: 12 },
      { name: 'TaxaML',  width: 12 },
      { name: 'Frete',  width: 12 },
      { name: 'Lucro',  width: 12 },
      { name: 'Status', width: 8 },
    ];
    
    var data: any = []
    this.dataSource.filteredData.forEach(prod =>{
      let line = [
        prod.mlId, prod.sku, prod.gtin, prod.url, prod.descricao, prod.categoria, prod.custo, prod.precoDesconto, prod.taxaML, prod.custoFrete, prod.lucro,prod.status
      ]
      data.push(line);
    });
    
    worksheet.addTable({
      name: "Anuncios",
      ref: "A1",
      columns: columns,
      rows: data
    });


    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = 'example.xlsx';
      a.click();
    });
  }

  getImageForAnuncio(anuncio: Anuncio): any{
    return this.anuncioImgsMap.get(anuncio);
  }
}
