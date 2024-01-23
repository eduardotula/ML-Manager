import { Venda } from './Venda'; // Assuming Venda is another class or interface

class Order {
    public id: number;
    public orderId: number;
    public packId: number;
    public vendas: Venda[];
    public orderCreationTime: Date;
    public createdAt: Date;

    constructor(
        id: number,
        orderId: number,
        packId: number,
        vendas: Venda[],
        orderCreationTime: Date,
        createdAt: Date
    ) {
        this.id = id;
        this.orderId = orderId;
        this.packId = packId;
        this.vendas = vendas;
        this.orderCreationTime = orderCreationTime;
        this.createdAt = createdAt;
    }
}

export { Order };