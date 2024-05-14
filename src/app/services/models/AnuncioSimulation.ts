export class AnuncioSimulation {
    categoria: string;
    mlId: string;
    valorVenda: number;
    custo: number;
    custoFrete: number;
    equivalentMlId: string;
    csosn: string;
    tipoAnuncio: string;

    constructor(
        categoria: string,
        mlId: string,
        valorVenda: number,
        custo: number,
        custoFrete: number,
        csosn: string,
        equivalentMlId: string,
        tipoAnuncio: string,
    ) {
        this.equivalentMlId = equivalentMlId;
        this.mlId = mlId;
        this.categoria = categoria;
        this.valorVenda = valorVenda;
        this.custo = custo;
        this.custoFrete = custoFrete;
        this.csosn = csosn;
        this.tipoAnuncio = tipoAnuncio;
    }
}