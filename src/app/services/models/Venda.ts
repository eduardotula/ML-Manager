import { Anuncio } from "./Anuncio";
import { AnuncioVenda } from "./AnuncioVenda";

class Venda {
    public id: number;
    public quantidade: number;
    public precoDesconto: number;
    public taxaML: number;
    public custoFrete: number;
    public custo: number;
    public lucro: number;
    public completo: boolean;
    public status: string;
    public orderId: number;
    public anuncio: AnuncioVenda;
    public createdAt: Date;

    constructor(
        id: number,
        quantidade: number,
        precoDesconto: number,
        taxaML: number,
        custoFrete: number,
        custo: number,
        lucro: number,
        completo: boolean,
        status: string,
        anuncio: AnuncioVenda,
        orderId: number,
        createdAt: Date
    ) {
        this.id = id;
        this.quantidade = quantidade;
        this.precoDesconto = precoDesconto;
        this.taxaML = taxaML;
        this.custoFrete = custoFrete;
        this.custo = custo;
        this.lucro = lucro;
        this.completo = completo;
        this.status = status;
        this.orderId = orderId;
        this.anuncio = anuncio,
        this.createdAt = createdAt;
    }
}

export { Venda };