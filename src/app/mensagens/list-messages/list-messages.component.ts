import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';
import { UserLSService } from 'src/app/services/local-storage/user-ls.service';
import { MessagesService } from 'src/app/services/messages.service';
import { Anuncio } from 'src/app/services/models/Anuncio';

@Component({
    selector: 'app-list-messages',
    templateUrl: './list-messages.component.html',
    styleUrls: ['./list-messages.component.scss'],
})

export class ListMessagesComponent implements OnInit {

    anuncios!: Anuncio[];
    errorMsg!: string;

    constructor(public messageService: MessagesService,public anuncioService: AnuncioService, public userService: UserLSService) { }


    ngOnInit() { 
        this.anuncioService.listAllAnunciosWithMessages(this.userService.getCurrentUser()).subscribe({
            next: (anuncios) =>{
                console.log(anuncios)
                this.anuncios = anuncios;
            }, error: (err) => this.errorMsg = err.message
        })
    }

    
}