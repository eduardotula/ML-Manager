import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { Anuncio } from 'src/app/services/models/Anuncio';
import { AnuncioSimulation } from 'src/app/services/models/AnuncioSimulation';

@Component({
    selector: 'calcular-anuncio',
    templateUrl: './calcular-anuncio.component.html',
    styleUrls: ['./calcular-anuncio.component.scss']
})
export class CalcularAnuncioComponent implements OnInit {

    anuncio: Anuncio;
    lucro: number = 0;
    precoDesconto: number = 0;
    loading: boolean = false;
    errorMsg: string = "";

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any, private anuncioService: AnuncioService,
        private lsUserService: UserLSService) {
            var anuncio = data.anuncio;
            this.anuncio = anuncio;
         }



    ngOnInit(): void {
        console.log(this.data);
        this.precoDesconto = this.anuncio.precoDesconto;
        this.lucro = this.anuncio.lucro;
    }

    calculateLucro(){
        this.loading = true;
        var anuncioSimulation = new AnuncioSimulation(this.anuncio.categoria,
             this.precoDesconto, this.anuncio.custo, this.anuncio.custoFrete, 
             this.anuncio.csosn, this.anuncio.listingType);
        this.anuncioService.simulateAnuncio(anuncioSimulation, this.lsUserService.getCurrentUser()).subscribe({
            next: (response) =>{
                this.lucro = response.lucro;
                this.loading = false;
            }, error: (error) => {
                this.loading = false;
                this.errorMsg = error.message;
            }
        })
        
    }
}
