import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { ImageModel } from 'src/app/default-components/default-table/image-model';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { ImageMLService } from 'src/app/services/image-ml.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { MercadoLivreService } from 'src/app/services/mercado-livre.service';
import { AnuncioSimple } from 'src/app/services/models/AnuncioSimple';
import { MercadoLivreAnuncio } from 'src/app/services/models/MercadoLivreAnuncio';
import { User } from 'src/app/services/models/User';

@Component({
  selector: 'app-cadastrar-anuncio',
  templateUrl: './cadastrar-anuncio.component.html',
  styleUrls: ['./cadastrar-anuncio.component.scss'],
})
export class CadastrarAnuncioComponent implements OnInit {
  
  currentUserId: number;
  loading: boolean = true;
  containsRouteParams = false;
  productForm!: FormGroup;
  filterForm!: FormGroup;
  name: any;
  errorMsg: string = "";
  @ViewChild('anuncioDialog', { static: true })
  anunciosDialog!: TemplateRef<any>;
  anuncioImages: ImageModel<MercadoLivreAnuncio> = new ImageModel();
  dataSource = new MatTableDataSource<MercadoLivreAnuncio>([]);
  @ViewChild('tables') table!: MatTable<MercadoLivreAnuncio>;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns = ["img","id", "title", "status"];

  constructor(private formBuilder: FormBuilder, public service: AnuncioService, public lsUser: UserLSService,
    public route: ActivatedRoute, public router: Router, private mlService: MercadoLivreService, private dialog: MatDialog,
    private mlImageService: ImageMLService) {
      
    this.currentUserId = this.lsUser.getCurrentUser();
    this.filterForm = this.formBuilder.group({
      id: "",
      descricao: "",
      status: true
    });
    this.dataSource.filter = this.filterForm  as unknown as string;

    this.route.queryParams.subscribe(params =>{
      this.productForm = this.formBuilder.group({
        mlId: [params['mlId'], Validators.required],
        custo: [params['custo'], Validators.required],
        csosn: [params['csosn'], Validators.required],
        descricao: [params['descricao']],
        sku: [params['sku']],
      })
      if(params['mlId']) this.onTableClick({id: params["mlId"]} as MercadoLivreAnuncio);

      if(this.productForm.valid){
        this.containsRouteParams = true;
      }

      this.filterForm.valueChanges.subscribe((value) => {
        this.dataSource.filter = value;
      });
    });
    this.dataSource.filterPredicate = this.customFilter;
  }

  ngOnInit() {
    this.resetPageState();
    this.loading = true;
    //Filtra para que somente anuncios que não estão registrados sejam exibidos
    this.service.listAllAnunciosMercadoLivre(this.currentUserId, true).subscribe({
      next: (mlIds) => {
        this.service.listAll(this.currentUserId, true).subscribe({
          next: (anuncios) => {
            var registeredIds = new Set(anuncios.map((anuncio) => anuncio.mlId));
            var filtered = mlIds.filter(mlId => !registeredIds.has(mlId));

            this.setMercadoLivreAnuncios(filtered);
            
          }
        });

      },
      error: (msg) => {
        this.errorMsg = msg.message;
        this.loading = false;
      }
    });
    if(!this.productForm.valid){
      this.resetForm();
    }
  }

  customFilter(data: MercadoLivreAnuncio, filter: any): boolean {
    const a = !filter.id || data.id.toLowerCase().includes(filter.id.toLowerCase());
    const b = !filter.descricao || data.title.toLowerCase().includes(filter.descricao.toLowerCase());
    
    const s = !filter.status || data.status == "active" ? true : false;
    return a && b && s;
  }
  
  openBuscarDialog(){
    //Correção de top bar
    this.dialog.open(this.anunciosDialog, {
      width: "150vh",
      position: {top: "20vh"}
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

  get descricao(){
    return this.productForm.get("descricao");
  }
  get sku(){
    return this.productForm.get("sku");
  }

  setMercadoLivreAnuncios(ids: string[]){
    var anuncioObser: Observable<MercadoLivreAnuncio>[] = [];
    ids.forEach(id => anuncioObser.push(this.mlService.getAnuncioByMlId(id)))
    forkJoin(anuncioObser).subscribe({
      next: (mercadoLivreAnuncio) =>{
        this.dataSource.data = mercadoLivreAnuncio;
        this.dataSource.sort = this.sort;
        
        mercadoLivreAnuncio.forEach(mlanuncio =>{

          if(mlanuncio.pictures && mlanuncio.pictures.length > 0){
            this.mlImageService.getImage(mlanuncio.pictures[0].url).subscribe({
              next: (imgBlob) => {
                this.anuncioImages.addImage(mlanuncio, imgBlob);
                this.loading = false;
              },
              error: (error)=>{
                this.loading = false;
                this.errorMsg = error.message;
              }
            });
          }
        })

      }, error: (error) =>{
        this.loading = false;
        this.errorMsg = error.message;
      }
    })
  }

  onSubmit() {
    if (this.productForm.valid) {
      var anuncioSimple = new AnuncioSimple(this.productForm.value["mlId"], this.productForm.value["csosn"], this.productForm.value["custo"]);
      this.loading = true;

      this.service.getAnuncioByMlId(anuncioSimple.mlId, this.currentUserId, false).subscribe({
        next: (existAnuncio) => {

          if(!this.containsRouteParams && !existAnuncio){
              this.createAnuncio(anuncioSimple);
          } else {
            this.updateAnuncio(anuncioSimple, this.containsRouteParams);
          }

        },error: (error) =>{
          this.errorMsg = error.message;
          this.loading = false;
        }
      });
    } else {
      console.log('Form is invalid');
    }
  }

  onTableClick(mlId: MercadoLivreAnuncio ){
    this.dialog.closeAll();
    this.loading = true;
    this.service.getAnuncioByMlIdSearch(mlId.id, this.currentUserId).subscribe({next: (prod) => {
      this.productForm.patchValue({
        descricao: prod.descricao,
        sku: prod.sku,
        mlId: prod.mlId
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
    this.service.createAnuncioSearch(anuncioSimple, this.currentUserId).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(anuncio => anuncio.id != anuncioSimple.mlId);
        this.resetPageState();
        this.resetForm();
      },
      error: (error) => {
        this.errorMsg = error.message;
        this.loading = false;
      }
      });
  }

  updateAnuncio(anuncioSimple: AnuncioSimple, navigateToHome: boolean){
    this.service.updateAnuncioSimple(anuncioSimple, this.currentUserId).subscribe({
      next: () => {
        if(navigateToHome)
          this.router.navigate([""]);
          this.resetPageState();
          this.resetForm();
      },
      error: (error) => {
        this.errorMsg = error.message;
        this.loading = false;
      }
      });
  }

  getImageForAnuncio(anuncio: MercadoLivreAnuncio){
    return this.anuncioImages.getImage(anuncio);
  }

  resetPageState(){
    this.loading = false;
    this.errorMsg = "";
  }

  resetForm(){
    this.productForm = this.formBuilder.group({
      mlId: ["", Validators.required],
      custo: ["", Validators.required],
      csosn: [null, Validators.required],
      sku: [""],
      descricao: [""],
    });
  }
}
