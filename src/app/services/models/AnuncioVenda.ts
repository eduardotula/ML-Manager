export class AnuncioVenda{

    public id: number;
    public mlId: string;
    public descricao: string;
    public registered: boolean;

    constructor(id: number, mlId: string, descricao: string, registered: boolean){
        this.id = id;
        this.mlId = mlId;
        this.descricao = descricao;
        this.registered = registered;
    }
    
}