export class AnuncioVenda{

    public id: number;
    public mlId: string;
    public descricao: string;
    public complete: boolean;

    constructor(id: number, mlId: string, descricao: string, complete: boolean){
        this.id = id;
        this.mlId = mlId;
        this.descricao = descricao;
        this.complete = complete;
    }
    
}