import { Component, OnInit, PipeTransform } from '@angular/core';
import { MlServiceService } from './services/ml-service.service';
import { Produto } from './services/models/Produto';
import { FormControl } from '@angular/forms';
import { Observable, map, lastValueFrom , startWith, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  produtos: Produto[] = [];
  produtosTemp!: Observable<Produto[]>;
  filter = new FormControl('', { nonNullable: true });
  service: MlServiceService;
  errorMsg: string = "";

  constructor(service: MlServiceService, ){
    this.service = service;

    try{
      this.loadProdutos();
    }catch (error){
      this.errorMsg = "Falha ao obter produtos";
      console.error("Falha ao obter produtos", error);
    }

  }

  async loadProdutos(){
    this.produtos = await lastValueFrom(this.service.listAll());
    this.produtosTemp = of(this.produtos);
    this.produtosTemp = this.filter.valueChanges.pipe(
      startWith(''), map((text) => this.search(text)),
    );
  } 

  ngOnInit(): void {


  }

  search(text: string): Produto[]{
    return this.produtos.filter((produto) => {
      const term = text.toLowerCase();
      return (
        produto.descricao.toLowerCase().includes(term)
      );
    });
  }

  openProdutoPage(url: string){
    window.open(url);
  }
}
