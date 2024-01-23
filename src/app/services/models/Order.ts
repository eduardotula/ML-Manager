import { Venda } from './Venda'; // Assuming Venda is another class or interface

class Order {
    private id: number;
    private orderId: number;
    private packId: number;
    private vendas: Venda[];
    private orderCreationTime: Date;
    private createdAt: Date;

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