import { Component, OnInit } from '@angular/core';
import { AnuncioService } from 'src/app/services/anuncios.service';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
    selector: 'app-list-messages',
    templateUrl: './list-messages.component.html',
    styleUrls: ['./list-messages.component.scss'],
})

export class ListMessagesComponent implements OnInit {


    constructor(messageService: MessagesService, anuncioService: AnuncioService) { }

    ngOnInit() { }
}