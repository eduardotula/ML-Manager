import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'anuncioStatus'})
export class AnuncioStatusPipe implements PipeTransform {
    
    transform(status: string): string {
        switch(status){
            case "active": return "Ativo"
            case "closed": return "Desativado"
        }
        return status;
    }
}