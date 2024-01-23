import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { MlServiceService } from 'src/app/services/anuncios.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { AnuncioSimple } from 'src/app/services/models/AnuncioSimple';

@Component({
  selector: 'app-cadastrar-anuncio',
  templateUrl: './cadastrar-anuncio.component.html',
  styleUrls: ['./cadastrar-anuncio.component.scss'],
})
export class CadastrarAnuncioComponent implements OnInit {
  
  loading: boolean = true;
  productForm!: FormGroup;
  mlIds!: string[];
  name: any;
  isCreate: boolean = true;
  errorMsg: string = "";

  constructor(private formBuilder: FormBuilder, public service: MlServiceService, public lsUser: UserLSService,
    public route: ActivatedRoute, public router: Router) {

    this.route.queryParams.subscribe(params =>{
      this.productForm = this.formBuilder.group({
        mlId: [params['mlId'], Validators.required],
        custo: [params['custo'], Validators.required],
        csosn: [params['csosn'], Validators.required],
        descricao: [params['descricao']],
        sku: [params['sku']],
      })
      if(params['mlId']) this.onTableClick(params["mlId"]);

      if(this.productForm.valid)this.isCreate = false;
    });
  }


  ngOnInit() {
    this.resetPageState();
    this.loading = true;
    this.service.listAllActiveMlMinusRegistered(this.lsUser.getCurrentUser()).subscribe({
      next: (ids) => {
        this.mlIds = ids;
        this.loading = false;
      },
      error: (msg) => {
        this.errorMsg = msg.message;
        this.loading = false;
      }
    });
    if(!this.productForm.valid){
      this.productForm = this.formBuilder.group({
        mlId: ["", Validators.required],
        custo: ["", Validators.required],
        csosn: [null, Validators.required],
        sku: [""],
        descricao: [""],
      });
    }

  }

  get mlId(){
    return this.productForm.get("mlId");
  }

  get custo(){
    return this.productForm.get("custo");
  }

  get csosn(){
    return this.productForm.get("csosn");
  }

  get descricao(){
    return this.productForm.get("descricao");
  }
  get sku(){
    return this.productForm.get("sku");
  }



  onSubmit() {
    if (this.productForm.valid) {
      var anuncioSimple = new AnuncioSimple(this.productForm.value["mlId"], this.productForm.value["csosn"], this.productForm.value["custo"]);
      this.loading = true;

      this.service.getAnuncioByMlId(anuncioSimple.mlId, this.lsUser.getCurrentUser()).subscribe({
        next: (existAnuncio) => {

          if(this.isCreate && !existAnuncio)  this.createAnuncio(anuncioSimple);
            else this.updateAnuncio(anuncioSimple);
          
        },error: (error) =>{
          this.errorMsg = error.message;
          this.loading = false;
        }
      });





    } else {
      console.log('Form is invalid');
    }
  }

  onTableClick(mlId: string){
    this.loading = true;
    this.service.getAnuncioByMlIdSearch(mlId, this.lsUser.getCurrentUser()).subscribe({next: (prod) => {
      this.productForm.patchValue({
        descricao: prod.descricao,
        sku: prod.sku
      })
      this.resetPageState();
    }, error: (erro) => {
      this.loading = false;
      this.errorMsg = "Falha ao obter descrição de Anuncio"
    }});

    this.productForm.patchValue({
      mlId: mlId,
    })
  }

  createAnuncio(anuncioSimple: AnuncioSimple){
    this.service.createAnuncioSearch(anuncioSimple, this.lsUser.getCurrentUser()).subscribe({
      next: () => window.location.reload(),
      error: (error) => {
        this.errorMsg = error.message;
        this.loading = false;
      }
      });
  }

  updateAnuncio(anuncioSimple: AnuncioSimple){
    this.service.updateAnuncioSimple(anuncioSimple, this.lsUser.getCurrentUser()).subscribe({
      next: () => this.router.navigate([""]),
      error: (error) => {
        this.errorMsg = error.message;
        this.loading = false;
      }
      });
  }

  resetPageState(){
    this.loading = false;
    this.errorMsg = "";
  }
}
