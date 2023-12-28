import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MlServiceService } from './services/ml-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProdutosComponent } from './produtos/list-produtos/list-produtos.component';
import { CadastrarProdutoComponent } from './produtos/cadastrar/cadastrar-produto.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { DefaultTableMethods } from './default-components/default-table/default-table';
import { ListVendasComponent } from './venda/list-vendas/list-vendas.component';



@NgModule({
    declarations: [
        AppComponent,
        ListProdutosComponent,
        CadastrarProdutoComponent,
        ListVendasComponent
    ],
    providers: [MlServiceService],
    bootstrap: [AppComponent],
    imports: [
        
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.rectangleBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0)',
            backdropBorderRadius: '4px',
            primaryColour: '#8a2be2'
          }),
    ]
})
export class AppModule { }
