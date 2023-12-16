import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl,  ReactiveFormsModule} from '@angular/forms';
import { Observable, lastValueFrom, of, startWith, map } from 'rxjs';
import { MlServiceService } from 'src/app/services/ml-service.service';
import { Produto } from 'src/app/services/models/Produto';


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

  constructor(public service: MlServiceService, ){}



  ngOnInit(): void {
    this.service.listAll().subscribe({next: (prods) => {
      this.produtos = prods;
      this.produtosTemp = of(prods);
      this.produtosTemp = this.filter.valueChanges.pipe(
        startWith(''), map((text) => this.search(text)),
      );
      this.loading = false;
    }, error: (error) => this.errorMsg = error.message});

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
