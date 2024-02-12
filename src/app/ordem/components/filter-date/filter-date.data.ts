export class FilterDateData{

    public dataInicial: Date = new Date();
    public dataFinal: Date = new Date();
    public text: string = "";

    constructor(dataInicial: Date, dataFinal: Date, text: string){
        this.dataInicial = dataInicial;
        this.dataFinal = dataFinal;
        this.text = text;
    }

    
}