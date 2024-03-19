import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateToString'})
export class DateToStringPipe implements PipeTransform {
    transform(date: Date): string {
        var newDate = new Date( Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getHours(), date.getMinutes()));
        return newDate.toISOString().split('.')[0];
    }
}