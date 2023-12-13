export class Produto {
    private id: number;
    private mlId: string;
    private sku: string;
    private gtin: string;
    private url: string;
    private descricao: string;
    private categoria: string;
    private custo: number;
    private csosn: string;
    private precoDesconto: number;
    private taxaML: number;
    private custoFrete: number;
    private status: string;
    private createdAt: Date;
    private lucro: number;

    // Constructor
    constructor(
        id: number,
        mlId: string,
        sku: string,
        gtin: string,
        url: string,
        descricao: string,
        categoria: string,
        custo: number,
        csosn: string,
        precoDesconto: number,
        taxaML: number,
        custoFrete: number,
        status: string,
        createdAt: Date,
        lucro: number
    ) {
        this.id = id;
        this.mlId = mlId;
        this.sku = sku;
        this.gtin = gtin;
        this.url = url;
        this.descricao = descricao;
        this.categoria = categoria;
        this.custo = custo;
        this.csosn = csosn;
        this.precoDesconto = precoDesconto;
        this.taxaML = taxaML;
        this.custoFrete = custoFrete;
        this.status = status;
        this.createdAt = createdAt;
        this.lucro = lucro;
    }
}