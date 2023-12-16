import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProdutosComponent } from './produtos/list-produtos/list-produtos.component';
import { CadastrarProdutoComponent } from './produtos/cadastrar/cadastrar-produto.component';

const routes: Routes = [
  { path: "", component: ListProdutosComponent},
  { path: "cadastrar-produto", component: CadastrarProdutoComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
