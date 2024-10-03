import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { ImageModel } from 'src/app/default-components/default-table/image-model';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { ImageMLService } from 'src/app/services/image-ml.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Anuncio, AnuncioMessage } from 'src/app/services/models/Anuncio';

@Component({
    selector: 'app-list-messages',
    templateUrl: './list-messages.component.html',
    styleUrls: ['./list-messages.component.scss'],
})

export class ListMessagesComponent implements OnInit {

    errorMsg!: string;
    loading: boolean = false;
    addMessageForm!: FormGroup;
    @ViewChild('messageDialog', { static: true })
    messageDialog!: TemplateRef<any>;
    avaliableMessageType: string[] = ["devolucao_arrependimento", "devolucao_defeito", "mensagem_compra"];
    selectedAnuncioToAddMessage!: Anuncio;
    dataSource = new MatTableDataSource<Anuncio>([]);
    displayedColumns: string[] = ["img","descricao", "mensagem", "botao+"];
    @ViewChild("tables") table!: MatTable<Anuncio>;
    @ViewChild(MatSort) sort!: MatSort;
    anuncioImages: ImageModel<Anuncio> = new ImageModel();

    constructor(public messageService: MessagesService,public anuncioService: AnuncioService, public userService: UserLSService, 
        private formBuilder: FormBuilder, private dialog: MatDialog, private imgService: ImageMLService,) { 

        this.addMessageForm = this.formBuilder.group({
            messageType: ["", Validators.required],
            message: ["", Validators.required],
        });
    }


    ngOnInit() { 
        this.dataSource.sort = this.sort;
        this.anuncioImages.anuncioImgsMap.clear();
        this.anuncioService.listAll(this.userService.getCurrentUser(), true).subscribe({
            next: (anuncios) =>{
                console.log(anuncios)
                this.dataSource.data = anuncios;
                this.dataSource.data.forEach((anuncio) =>{
                    if(anuncio.pictures.length > 0){
                      this.imgService.getImage(anuncio.thumbnailUrl).subscribe({
                        next: (imgBlob) => this.anuncioImages.addImage(anuncio, imgBlob)
                      });
                    }
                  });
            }, error: (err) => this.errorMsg = err.message
        })
    }

    onSaveMessage(anuncio: Anuncio, anuncioMessage: AnuncioMessage){
        if(anuncioMessage.message.length > 0){
            this.anuncioService.createAnuncioMessage(anuncioMessage, anuncio.id)
            .subscribe({next: () => window.location.reload(), error: (err) => this.errorMsg = err.message})
        }else{
            this.anuncioService.deleteAnuncioMessage(anuncioMessage.id, anuncio.id)
            .subscribe({next: () => window.location.reload(), error: (err) => this.errorMsg = err.message})
        }
    }

    openAddMessageType(anuncio: Anuncio){
        this.addMessageForm = this.formBuilder.group({
            messageType: ["", Validators.required],
            message: ["", Validators.required],
        });
        //Correção de top bar
        this.dialog.open(this.messageDialog, {
          width: "540px",
          data:{},
          position: {top: "20vh"}
        });
        this.selectedAnuncioToAddMessage = anuncio;
      }

    getAvaliableOptionsByAnuncio(anuncio: Anuncio): string[]{
        let avaliableForAnuncio: string[] = []; 

        this.avaliableMessageType.forEach((avaliable) =>{
            if(!anuncio.anuncioMessage.some((e) => e.messageType == avaliable)) avaliableForAnuncio.push(avaliable);
        });
        return avaliableForAnuncio;
    }
    
    onAddMessage(){
        console.log(this.selectedAnuncioToAddMessage);
        let anuncioMessage = new AnuncioMessage(0, this.addMessageForm.value["message"], this.addMessageForm.value["messageType"], this.selectedAnuncioToAddMessage.id);
        this.anuncioService.createAnuncioMessage(anuncioMessage, this.selectedAnuncioToAddMessage.id).subscribe({next: () =>{
            window.location.reload();
        }, error: (err) => this.errorMsg = err.message});
    }

    getImageForAnuncio(anuncio: Anuncio): any{
        return this.anuncioImages.getImage(anuncio);
      }
}