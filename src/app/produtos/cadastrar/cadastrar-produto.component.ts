import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MlServiceService } from 'src/app/services/ml-service.service';
import { ProdutoSimple } from 'src/app/services/models/ProdutoSimple';

@Component({
  selector: 'app-cadastrar-produto',
  templateUrl: './cadastrar-produto.component.html',
  styleUrls: ['./cadastrar-produto.component.scss'],
})
export class CadastrarProdutoComponent implements OnInit {
  
  loading: boolean = true;
  productForm!: FormGroup;
  mlIds!: string[];
  name: any;
  isCreate: boolean = true;
  errorMsg: string = "";

  constructor(private formBuilder: FormBuilder, public service: MlServiceService, public route: ActivatedRoute, public router: Router) {
    this.route.queryParams.subscribe(params =>{
      this.productForm = this.formBuilder.group({
        mlId: [params['mlId'], Validators.required],
        custo: [params['custo'], Validators.required],
        csosn: [params['csosn'], Validators.required],
      })
      if(this.productForm.valid)this.isCreate = false;
    });
  }


  ngOnInit() {
    this.service.listAllActiveMlMinusRegistered().subscribe({
      next: (ids) => {
        this.mlIds = ids;
        this.loading = false;
      },
      error: (msg) => this.errorMsg = msg.message
    });
    if(!this.productForm.valid){
      this.productForm = this.formBuilder.group({
        mlId: ["", Validators.required],
        custo: ["", Validators.required],
        csosn: [null, Validators.required],
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


  onSubmit() {
    if (this.productForm.valid) {
      var produtoSimple = new ProdutoSimple(this.productForm.value["mlId"], this.productForm.value["csosn"], this.productForm.value["custo"]);
      this.loading = true;
      if(this.isCreate){
        this.service.createProdutoSearch(produtoSimple).subscribe({
          next: () => window.location.reload(),
          error: (error) => {
            this.errorMsg = error.message;
            this.loading = false;
          }
          });
      }else{
        this.service.updateProdutoSimple(produtoSimple).subscribe({
          next: () => this.router.navigate([""]),
          error: (error) => {
            this.errorMsg = error.message;
            this.loading = false;
          }
          });
      }

    } else {
      console.log('Form is invalid');
    }
  }

  onTableClick(mlId: string){
    this.productForm.patchValue({
      mlId: mlId,
    })
  }
}
