import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'dateToString'})
export class DateToStringPipe implements PipeTransform {
    transform(date: Date): string {
        date.setUTCHours(0, 0, 0, 0);
        return date.toISOString().split('.')[0];
    }
}