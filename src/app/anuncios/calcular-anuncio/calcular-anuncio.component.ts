import { Component, Output, EventEmitter, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anuncio } from 'src/app/services/models/Anuncio';

@Component({
    selector: 'calcular-anuncio',
    templateUrl: './calcular-anuncio.component.html',
    styleUrls: ['./calcular-anuncio.component.scss']
})
export class CalcularAnuncioComponent implements OnInit {

    anuncio: Anuncio;
    lucro: number = 0;
    precoDesconto: number = 0;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any) {
            var anuncio = data.anuncio;
            this.anuncio = anuncio;
         }



    ngOnInit(): void {
        console.log(this.data);
        this.precoDesconto = this.anuncio.precoDesconto;
        this.lucro = this.anuncio.lucro;
    }

    changeLucro(newValue: any){
        
    }

    changeVenda(newValue: any){

    }
}
