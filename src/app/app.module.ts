import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MlServiceService } from './services/anuncios.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarAnuncioComponent } from './anuncios/cadastrar/cadastrar-anuncio.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ListVendasComponent } from './venda/list-vendas/list-vendas.component';
import { ListAnunciosComponent } from './anuncios/list-produtos/list-anuncios.component';
import { TableFilterPropertyPipe } from './pipes/table-filter-property.pipe';
import { TableSortPipe } from './pipes/table-sort.pipe';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
    declarations: [
        AppComponent,
        ListAnunciosComponent,
        CadastrarAnuncioComponent,
        ListVendasComponent,
        TableFilterPropertyPipe,
        TableSortPipe,
        
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
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        MatExpansionModule
    ]
})
export class AppModule { }
