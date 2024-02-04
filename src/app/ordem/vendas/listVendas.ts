import { Anuncio } from "src/app/services/models/Anuncio";
import { Venda } from "src/app/services/models/Venda";

export class ListVendas{

    public anuncio!: Anuncio;
    public vendas!: Venda[];
    public quantidade: number = 0;
    public somaCusto: number = 0;
    public somaVenda: number = 0;
    public somaLucro: number = 0;

    constructor(anuncio: Anuncio, vendas: Venda[]){
        this.anuncio = anuncio;
        this.vendas = vendas;
        this.sumValues();
    }

    public sumValues(){
        this.vendas.forEach(venda => {
            this.quantidade += venda.quantidade;
            this.somaCusto += venda.custo;
            this.somaVenda += venda.precoDesconto;
            this.somaLucro += venda.lucro;
        })
    }
}