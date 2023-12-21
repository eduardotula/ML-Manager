import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, lastValueFrom, of, startWith, map } from 'rxjs';
import { MlServiceService } from 'src/app/services/ml-service.service';
import { Produto } from 'src/app/services/models/Produto';
import * as ExcelJS from 'exceljs';


@Component({
  selector: 'app-list-produtos',
  templateUrl: "./list-produtos.component.html",
  styleUrls: ['./list-produtos.component.scss'],
})
export class ListProdutosComponent {

  loading = true;
  produtos: Produto[] = [];
  produtosTemp!: Observable<Produto[]>;
  filter = new FormControl('', { nonNullable: true });
  errorMsg: string = "";

  constructor(public service: MlServiceService, public router: Router) {
    this.errorMsg = ""
   }



  ngOnInit(): void {
    this.service.listAll().subscribe({
      next: (prods) => {
        this.produtos = prods;
        this.produtosTemp = of(prods);
        this.produtosTemp = this.filter.valueChanges.pipe(
          startWith(''), map((text) => this.search(text)),
        );
        this.loading = false;
      }, error: (error) => this.errorMsg = error.message
    });
    
  }

  search(text: string): Produto[] {
    return this.produtos.filter((produto) => {
      const term = text.toLowerCase();
      return (
        produto.descricao.toLowerCase().includes(term)
      );
    });
  }

  openProdutoPage(url: string) {
    window.open(url);
  }

  clickEdit(produto: Produto) {
    this.router.navigate(["/cadastrar-produto"], {
      queryParams: {
        mlId: produto.mlId,
        custo: produto.custo,
        csosn: produto.csosn
      }
    });
  }

  clickDelete(produto: Produto) {
    this.service.deleteProdutoById(produto.id).subscribe({
      next: () => window.location.reload(),
      error: (err) => this.errorMsg = err.message

    });
  }

  clickUpdate(produto: Produto) {
    this.service.updateProdutoSearchByMlId(produto.mlId).subscribe({
      next: () => window.location.reload(),
      error: (err) => this.errorMsg = err.message
    });
  }

  clickUpdateAll() {
    this.errorMsg = "";
    this.service.listAll().subscribe({
      next: (produtosRegistrados) => {

        produtosRegistrados.forEach(prod => {

          this.service.updateProdutoSearchByMlId(prod.mlId).subscribe({
            next: (prod) =>{
              console.log(prod);
            },
            error: () => {
              this.errorMsg += `Falha ao buscar atualização de produto: ${prod.mlId}`;
            }
          });
        })
        if(!this.errorMsg) window.location.reload();
      }
    })
  }

  exportToExcel(){
    var workbook = new ExcelJS.Workbook();
    var worksheet = workbook.addWorksheet("Produtos");
    var columns = [
      { name: 'mlId', width: 14 },
      { name: 'sku',  width: 20 },
      { name: 'gtin',  width: 13 },
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
    this.produtosTemp.subscribe(prods => prods.forEach(prod =>{
      let line = [
        prod.mlId, prod.sku, prod.gtin, prod.url, prod.descricao, prod.categoria, prod.custo, prod.precoDesconto, prod.taxaML, prod.custoFrete, prod.lucro,prod.status
      ]
      data.push(line);
    }))
    
    worksheet.addTable({
      name: "Produtos",
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
}
