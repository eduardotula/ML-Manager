import { Anuncio } from "./Anuncio";

class Venda {
    private id: number;
    private quantidade: number;
    private precoDesconto: number;
    private taxaML: number;
    private custoFrete: number;
    private custo: number;
    private lucro: number;
    private completo: boolean;
    private status: string;
    private orderId: number;
    private createdAt: Date;

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
        this.createdAt = createdAt;
    }
}

export { Venda };