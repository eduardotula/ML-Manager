import { Component, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { Anuncio } from 'src/app/services/models/Anuncio';
import * as ExcelJS from 'exceljs';
import { Router } from '@angular/router';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { ImageMLService } from 'src/app/services/image-ml.service';
import { ImageModel } from 'src/app/default-components/default-table/image-model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-anuncios',
  templateUrl: "./list-anuncios.component.html",
  styleUrls: ['./list-anuncios.component.scss'],
})
export class ListAnunciosComponent{

  @ViewChild("tables") table!: MatTable<Anuncio>;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild('calcularDialog', { static: true })
  calcularDialog!: TemplateRef<any>;

  dataSource = new MatTableDataSource<Anuncio>([]);
  loading: boolean = true;
  errorMsg: string = "";
  displayedColumns: string[] = ['id', 'mlId',"descricao", "custo", "venda", "taxaMl", "frete", "lucro","status","calcular" ,"edit", "update", "delete"];
  anuncioImages: ImageModel<Anuncio> = new ImageModel();
  filterForm: FormGroup;

  constructor(
    public service: AnuncioService,
    public lsUser: UserLSService,
    public router: Router, private imgService: ImageMLService,
    private dialog: MatDialog,
    formBuilder: FormBuilder,
    ) {
      this.dataSource.filterPredicate = this.customFilter;
      this.filterForm = formBuilder.group({
        descricao: '',
        status: true,
      });
      this.dataSource.filter = this.filterForm as unknown as string;
      this.filterForm.valueChanges.subscribe((value) => {
        this.dataSource.filter = value;
      });
    }

   ngAfterViewInit(): void {

    this.service.listAll(this.lsUser.getCurrentUser(), true).subscribe({
      next: (prods) => {
        this.dataSource.data = prods;
        this.dataSource.sort = this.sort;
        this.loading = false;
        
        this.dataSource.data.forEach((anuncio) =>{
          if(anuncio.pictures.length > 0){
            this.imgService.getImage(anuncio.pictures[0].url).subscribe({
              next: (imgBlob) =>{
                this.anuncioImages.addImage(anuncio, imgBlob);
              }
            });
          }
        });
      }, error: (error) => this.errorMsg = error.message
    });
  }

  customFilter(data: Anuncio, filter: any): boolean {
    const b = !filter.descricao || data.descricao.toLowerCase().includes(filter.descricao.toLowerCase());
    const s = !filter.status || data.status == "active" ? true : false;

    return b && s;
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

  openBuscarDialog(anuncio: Anuncio){
    //Correção de top bar
    this.dialog.open(this.calcularDialog, {
      width: "40vw",
      data:{anuncio: anuncio},
      position: {top: "20vh"}
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
    return this.anuncioImages.getImage(anuncio);
  }

  
  exportAnuncio(){
    var xmlDoc = document.implementation.createDocument(null, 'anuncios');

    var index = 1;
    this.dataSource.filteredData.forEach(row =>{
      let anuncio = xmlDoc.createElement("anuncio_"+index);
      let mlId = xmlDoc.createElement("mlId");
      mlId.textContent = row.mlId;
      let custo = xmlDoc.createElement("custo");
      custo.textContent = row.custo.toString();
      let csosn = xmlDoc.createElement("csosn");
      csosn.textContent = row.csosn;
      anuncio.appendChild(mlId);
      anuncio.appendChild(custo);
      anuncio.appendChild(csosn);

      xmlDoc.documentElement.appendChild(anuncio);
      index++;
    })

    var serializer = new XMLSerializer();
    var xmlString = serializer.serializeToString(xmlDoc);
    let blob = new Blob([xmlString], {type: "text/xml"});
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Anuncios.xml';
    a.click();
  }
}
