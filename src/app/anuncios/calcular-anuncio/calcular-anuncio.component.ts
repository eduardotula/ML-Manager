import { Component, Output, EventEmitter, Inject, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Anuncio } from 'src/app/services/models/Anuncio';

@Component({
    selector: 'calcular-anuncio',
    templateUrl: './calcular-anuncio.component.html',
    styleUrls: ['./calcular-anuncio.component.scss']
})
export class CalcularAnuncioComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Anuncio ) {}

    ngOnInit(): void {
        console.log(this.data);
    }
}
