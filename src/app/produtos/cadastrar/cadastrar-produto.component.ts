import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MlServiceService } from 'src/app/services/ml-service.service';
import { Produto } from 'src/app/services/models/Produto';
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
  errorMsg: string = "";

  constructor(private formBuilder: FormBuilder, public service: MlServiceService) {
  }


  ngOnInit() {
    this.service.listAllActiveMlMinusRegistered().subscribe({
      next: (ids) => {
        this.mlIds = ids;
        this.loading = false;
      },
      error: (msg) => this.errorMsg = msg.message
    });
    this.productForm = this.formBuilder.group({
      mlId: ["", Validators.required],
      custo: ["", Validators.required],
      csosn: [null, Validators.required],
    });
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
      this.service.createProdutoSearch(produtoSimple).subscribe({
        next: () => window.location.reload(),
        error: (error) => {
          this.errorMsg = error.message;
          this.loading = false;
        }
        });
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
