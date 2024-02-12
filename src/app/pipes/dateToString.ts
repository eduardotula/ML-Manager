import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateToString'})
export class DateToStringPipe implements PipeTransform {
    transform(date: Date): string {
        var newDate = new Date(date.toDateString());
        newDate.setUTCHours(0,0,0,0);
        return newDate.toISOString().split('.')[0];
    }
}