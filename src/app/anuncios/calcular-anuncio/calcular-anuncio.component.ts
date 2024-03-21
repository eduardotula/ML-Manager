import { Component, Output, EventEmitter, Inject, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

    lucro: number = 0; 
    anuncio!: Anuncio;

    isExistingAnuncio: boolean;
    consultaForm: FormGroup;
    @Input("isExistingAnuncio")
    loading: boolean = false;
    errorMsg: string = "";

    constructor(
        private formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public data: any, private anuncioService: AnuncioService,
        private lsUserService: UserLSService) {
            var anuncio: Anuncio = data.anuncio;
            this.anuncio = anuncio;
            this.isExistingAnuncio = data.isExistingAnuncio;

            this.lucro = anuncio.lucro;
            this.consultaForm = this.formBuilder.group({
                precoDesconto: [anuncio.precoDesconto, Validators.required],
                custo: [anuncio.custo, Validators.required],
                csosn: [anuncio.csosn, Validators.required],
                imposto: [anuncio.imposto],
                taxaML: [anuncio.taxaML, Validators.required],
                frete: [anuncio.custoFrete, Validators.required],
                equivalentMlId:[""]
              });
            if(!this.isExistingAnuncio){
                this.consultaForm.addControl("equivalentMlId", Validators.required);
            } 
         }


    ngOnInit(): void {
        console.log(this.data);
    }
    
    get getCusto(){
        return this.consultaForm.get("custo")!.value;
      }
     get getPrecoDesconto(){
        return this.consultaForm.get("precoDesconto")!.value;
      }
    
    get getImposto(){
        return this.consultaForm.get("imposto")!.value;
    }
    get getFrete(){
        return this.consultaForm.get("frete")!.value;
      }

    get getTaxaML(){
        return this.consultaForm.get("taxaML")!.value;
      } 

    calculateLucro(){
        this.loading = true;
        if(this.consultaForm.valid){
            var anuncioSimulation = new AnuncioSimulation(this.anuncio.categoria,
                this.consultaForm.get("precoDesconto")!.value, this.consultaForm.get("custo")!.value, this.consultaForm.get("frete")!.value, 
                this.consultaForm.get("csosn")!.value, this.consultaForm.get("equivalentMlId")!.value, this.anuncio.listingType);
           this.anuncioService.simulateAnuncio(anuncioSimulation, this.lsUserService.getCurrentUser()).subscribe({
               next: (response) =>{
                   this.lucro = response.lucro;
                   this.consultaForm.setValue({
                        precoDesconto: this.consultaForm.get("precoDesconto")!.value,
                       custo: response.custo,
                       csosn: response.csosn,
                       imposto: response.imposto,
                       taxaML: response.taxaMl,
                       frete: response.frete,
                       equivalentMlId: this.consultaForm.get("equivalentMlId")!.value
                   });
                   this.loading = false;
               }, error: (error) => {
                   this.loading = false;
                   this.errorMsg = error.message;
               }
           })
        }

        
    }
}
