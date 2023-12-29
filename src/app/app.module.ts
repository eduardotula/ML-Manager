import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MlServiceService } from './services/ml-service.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarAnuncioComponent } from './anuncios/cadastrar/cadastrar-anuncio.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ListVendasComponent } from './venda/list-vendas/list-vendas.component';
import { ListAnunciosComponent } from './anuncios/list-produtos/list-anuncios.component';
import { TableFilterPropertyPipe } from './pipes/table-filter-property.pipe';
import { TableSortPipe } from './pipes/table-sort.pipe';



@NgModule({
    declarations: [
        AppComponent,
        ListAnunciosComponent,
        CadastrarAnuncioComponent,
        ListVendasComponent,
        TableFilterPropertyPipe,
        TableSortPipe
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
