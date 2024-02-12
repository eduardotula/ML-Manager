import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AnuncioService } from './services/anuncios.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastrarAnuncioComponent } from './anuncios/cadastrar/cadastrar-anuncio.component';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { ListOrdensComponent } from './ordem/list-ordens/list-ordens.component';
import { ListAnunciosComponent } from './anuncios/list-produtos/list-anuncios.component';
import { MatTableModule} from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatExpansionModule } from '@angular/material/expansion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListVendasComponent } from './ordem/vendas/list-vendas.component';
import { AnuncioStatusPipe } from './pipes/anuncio-status.pipe';
import { FilterDateComponent } from './ordem/components/filter-date/filter-date.component';
import { NgbDatePipe } from './pipes/ngbDate.pipe';
import { NgbDateCustomParserFormatter } from './utils/ngbDateCustomParserFormatter';
import { DateToStringPipe } from './pipes/dateToString';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { MercadoLivreService } from './services/mercado-livre.service';
import { MatDialogModule } from '@angular/material/dialog';

registerLocaleData(localePt);

@NgModule({
    declarations: [
        AppComponent,
        ListAnunciosComponent,
        CadastrarAnuncioComponent,
        ListOrdensComponent,
        ListVendasComponent,
        FilterDateComponent,
        DateToStringPipe,
        AnuncioStatusPipe,
        NgbDatePipe,
    ],
    providers: [AnuncioService,
        MercadoLivreService,
        DateToStringPipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        {   provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter},],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MatDialogModule,
        NgxLoadingModule.forRoot({
            animationType: ngxLoadingAnimationTypes.rectangleBounce,
            backdropBackgroundColour: 'rgba(0,0,0,0)',
            backdropBorderRadius: '4px',
            primaryColour: '#8a2be2'
          }),
        MatTableModule,
        MatSortModule,
        BrowserAnimationsModule,
        MatExpansionModule,
        
    ]
})
export class AppModule { }
