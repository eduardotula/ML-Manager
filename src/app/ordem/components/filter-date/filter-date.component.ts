import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'filter-date',
    templateUrl: './filter-date.component.html',
    styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit {

    today = inject(NgbCalendar).getToday();

    filterForm: FormGroup;

    @Output() dateSelected = new EventEmitter<{dataInicial: Date, dataFinal: Date}>();
    
    constructor(private formBuilder: FormBuilder,) { 

        this.filterForm = formBuilder.group({
            dataInicial: ["", Validators.required],
            dataFinal: ["", Validators.required]
        })
    }

    ngOnInit(): void {
        registerLocaleData(localePt);
     }

     submit(){
        if(this.filterForm.valid){
            var ini: NgbDateStruct = this.filterForm.value["dataInicial"];
            var fin: NgbDateStruct = this.filterForm.value["dataFinal"];
            var dataInicial = new Date(`${ini.year}-${ini.month}-${ini.day}`);
            var dataFinal = new Date(`${fin.year}-${fin.month}-${fin.day+1}`);
            this.dateSelected.emit({dataInicial, dataFinal})
        }
     }

     get getdataInicial(){
        return this.filterForm.get("dataInicial");
     }

     get getdataFinal(){
        return this.filterForm.get("dataFinal");
     }
}
