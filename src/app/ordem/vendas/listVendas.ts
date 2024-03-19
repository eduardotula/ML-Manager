import { Anuncio } from "src/app/services/models/Anuncio";
import { Venda } from "src/app/services/models/Venda";

export class ListVendas{

    public anuncio!: Anuncio;
    public vendas!: Venda[];
    public quantidade: number = 0;
    public quantidadeCancelado: number = 0;
    public somaCusto: number = 0;
    public somaVenda: number = 0;
    public somaLucro: number = 0;
    searchField: string;

    constructor(anuncio: Anuncio, vendas: Venda[]){
        this.anuncio = anuncio;
        this.vendas = vendas;
        this.searchField = anuncio.descricao;
    }

    public sumValues(){
        this.vendas.forEach(venda => {
            if( venda.status == "paid"){
                this.quantidade += venda.quantidade;
            }else{
                this.quantidadeCancelado += venda.quantidade;
            }
            this.somaCusto += venda.custo;
            this.somaVenda += venda.precoDesconto;
            this.somaLucro += venda.lucro;
        })
    }
}