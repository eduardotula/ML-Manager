import { Url } from "./Url";
import { Venda } from "./Venda";

export class Anuncio{
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
    public listingType: string;
    public imposto: number;
    public complete: boolean;
    public pictures: Url[];
    public vendas: Venda[];

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
        complete: boolean,
        pictures: Url[],
        vendas: Venda[],
        imposto: number,
        listingType: string
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
        this.pictures = pictures;
        this.vendas = vendas;
        this.listingType = listingType;
        this.imposto = imposto;
    }

    static setValuesWithAnuncio(
        oldAnuncio: Anuncio,
        anuncio: Anuncio
    ) {
        oldAnuncio.id = anuncio.id;
        oldAnuncio.mlId = anuncio.mlId;
        oldAnuncio.sku = anuncio.sku;
        oldAnuncio.gtin = anuncio.gtin;
        oldAnuncio.url = anuncio.url;
        oldAnuncio.descricao = anuncio.descricao;
        oldAnuncio.categoria = anuncio.categoria;
        oldAnuncio.custo = anuncio.custo;
        oldAnuncio.csosn = anuncio.csosn;
        oldAnuncio.precoDesconto = anuncio.precoDesconto;
        oldAnuncio.taxaML = anuncio.taxaML;
        oldAnuncio.custoFrete = anuncio.custoFrete;
        oldAnuncio.status = anuncio.status;
        oldAnuncio.createdAt = anuncio.createdAt;
        oldAnuncio.lucro = anuncio.lucro;
        oldAnuncio.complete = anuncio.complete;
        oldAnuncio.pictures = anuncio.pictures;
        oldAnuncio.vendas = anuncio.vendas;
        oldAnuncio.listingType = anuncio.listingType;
        oldAnuncio.imposto = anuncio.imposto;
    }
}