import { Searchable } from "src/app/default-components/default-table/Searchable";

export class Anuncio implements Searchable{
    public id: number;
    public mlId: string;
    public sku: string;
    public gtin: string;
    public url: string;
    public descricao: string;
    public categoria: string;
    public custo: number;
    public csosn: string;
    public precoDesconto: number;
    public taxaML: number;
    public custoFrete: number;
    public status: string;
    public createdAt: Date;
    public lucro: number;
    public searchField: string = "";
    public complete: boolean;

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
        lucro: number,
        complete: boolean
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
        this.complete = complete;
        //Utilizado para busca
        this.searchField = descricao;
    }
}