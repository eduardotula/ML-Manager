import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterDateData } from './filter-date.data';

@Component({
    selector: 'filter-date',
    templateUrl: './filter-date.component.html',
    styleUrls: ['./filter-date.component.scss']
})
export class FilterDateComponent implements OnInit {

    today = inject(NgbCalendar).getToday();

    filterForm: FormGroup;

    @Output() dateSelected = new EventEmitter<FilterDateData>();
    @Output() textSelected = new EventEmitter<string>();
    @Input() initialDate!: Date;
    @Input() finalDate!: Date;
    
    constructor(private formBuilder: FormBuilder,) { 
        this.filterForm = formBuilder.group({
            dataInicial: ["", Validators.required],
            dataFinal: ["", Validators.required],
            text: [""],
        })

    }

    ngOnInit(): void {
        if(this.initialDate && this.finalDate){
            this.filterForm.patchValue({
                dataInicial: new NgbDate(this.initialDate.getFullYear(), this.initialDate.getMonth()+1, this.initialDate.getDate()),
                dataFinal: new NgbDate(this.finalDate.getFullYear(), this.finalDate.getMonth()+1, this.finalDate.getDate())
            })
        }
     }

     submit(){
        if(this.filterForm.valid){
            var ini: NgbDateStruct = this.filterForm.value["dataInicial"];
            var fin: NgbDateStruct = this.filterForm.value["dataFinal"];
            var text: string = this.filterForm.value["text"];
            var dataInicial = new Date(`${ini.year}-${ini.month}-${ini.day}`);
            var dataFinal = new Date(fin.year, fin.month-1, fin.day, 23, 59, 59, 999);
            this.dateSelected.emit(new FilterDateData(dataInicial, dataFinal, text));
        }
     }

    keyPressed(event: Event) {
        var filterValue = (event.target as HTMLInputElement).value;
        return this.textSelected.emit(filterValue);
    }

     get getdataInicial(){
        return this.filterForm.get("dataInicial");
     }

     get getdataFinal(){
        return this.filterForm.get("dataFinal");
     }

     get getText(){
        return this.filterForm.get("text");
     }
}
