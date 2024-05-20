import { PaymentGateway } from "@/infra/gateways";

export class Pagarme implements PaymentGateway {
    async pixGenerate(order: PaymentGateway.Order): Promise<PaymentGateway.PixGenerateResponse> {
        return await this.createOrderWithPix(order);
    }

    private createOrderWithPix(order: PaymentGateway.Order): Promise<PaymentGateway.PixGenerateResponse> {
        return new Promise<PaymentGateway.PixGenerateResponse>((resolve) => {
            // Aqui podemos implementat a lógica para gerar o PIX usando a API do Pagarme
            // Por exemplo:
            const pixUrl = "https://example.com/pix"; // URL gerada para o PIX
            const pixCode = "1234567890"; // Código do PIX gerado
            const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira em 24 horas
            resolve({
                paymentMethod: 'Pix',
                pixUrl,
                pixCode,
                expirationDate
            })
        })
    }
}
