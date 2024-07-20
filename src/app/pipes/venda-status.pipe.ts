import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'vendaStatus'})
export class VendaStatusPipe implements PipeTransform {
    
    transform(status: string): string {
        switch(status){
            case "paid": return "Pago"
            case "cancelled": return "Cancelado"
        }
        return status;
    }
}