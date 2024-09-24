import { Order } from '@/domain/contracts/repos'

export interface PaymentGateway {
    pixGenerate(order: PaymentGateway.Order): Promise<PaymentGateway.PixGenerateResponse>;
}

export namespace PaymentGateway {
    export type PixGenerateResponse = {
        paymentMethod: string
        pixUrl: string;
        pixCode: string;
        expirationDate: Date;
    }

    export type Order = Order.FindOrderOutput
}

