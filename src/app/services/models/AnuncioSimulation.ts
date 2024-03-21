export class AnuncioSimulation {
    categoria: string;
    valorVenda: number;
    custo: number;
    custoFrete: number;
    equivalentMlId: string;
    csosn: string;
    tipoAnuncio: string;

    constructor(
        categoria: string,
        valorVenda: number,
        custo: number,
        custoFrete: number,
        csosn: string,
        equivalentMlId: string,
        tipoAnuncio: string,
    ) {
        this.equivalentMlId = equivalentMlId;
        this.categoria = categoria;
        this.valorVenda = valorVenda;
        this.custo = custo;
        this.custoFrete = custoFrete;
        this.csosn = csosn;
        this.tipoAnuncio = tipoAnuncio;
    }
}