import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AnuncioService } from 'src/app/services/anuncios.service';
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

    anuncios!: Anuncio[];
    errorMsg!: string;
    loading: boolean = false;
    addMessageForm!: FormGroup;
    @ViewChild('messageDialog', { static: true })
    messageDialog!: TemplateRef<any>;
    avaliableMessageType: string[] = ["devolucao_arrependimento", "devolucao_defeito", "mensagem_compra"];
    selectedAnuncioToAddMessage!: Anuncio;

    constructor(public messageService: MessagesService,public anuncioService: AnuncioService, public userService: UserLSService, 
        private formBuilder: FormBuilder, private dialog: MatDialog,) { 

        this.addMessageForm = this.formBuilder.group({
            messageType: ["", Validators.required],
            message: ["", Validators.required],
        });
    }


    ngOnInit() { 
        this.anuncioService.listAll(this.userService.getCurrentUser(), true).subscribe({
            next: (anuncios) =>{
                console.log(anuncios)
                this.anuncios = anuncios;
            }, error: (err) => this.errorMsg = err.message
        })
    }

    onSaveMessage(anuncio: Anuncio, anuncioMessage: AnuncioMessage){
        if(anuncioMessage.message.length > 0){

        }
    }

    openAddMessageType(anuncio: Anuncio){
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
        
    }
}