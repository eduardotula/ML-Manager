import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tableFilterProperty'
})
export class TableFilterPropertyPipe implements PipeTransform {

  transform(values: any, arg?: any, value?:any): any {
    if (!values) return null;
    if (!arg || !value) return values;


    arg = arg.toLowerCase();
    value = value.toLowerCase();
  
    return values.filter((element:any)=>{ 
      return element[arg].toLowerCase() == value
    })
  }

}
