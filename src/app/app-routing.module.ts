import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarAnuncioComponent } from './anuncios/cadastrar/cadastrar-anuncio.component';
import { ListVendasComponent } from './venda/list-vendas/list-vendas.component';
import { ListAnunciosComponent } from './anuncios/list-produtos/list-anuncios.component';

const routes: Routes = [
  { path: "", component: ListAnunciosComponent},
  { path: "cadastrar-anuncio", component: CadastrarAnuncioComponent},
  { path: "list-vendas", component: ListVendasComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
