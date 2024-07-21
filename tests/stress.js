import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

export let options = {
    vus: 10, // Número de usuários virtuais
    iterations: 100, // Número total de iterações
};

let url = 'http://localhost/v1/api/order';
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlOYW1lIjoicG9udGFsdGVjaC1yY3MtYXBpLWNsaWVudC1wb2ludGVyIn0.ASugz5QZS757QdNXqzIa2TDn4Wx1znAUBWtdMv4AzdQ';
let headers = {
    'Authorization': token,
    'Content-Type': 'application/json'
};

let responseTimeTrend = new Trend('response_time');

export default function () {
    let body = JSON.stringify({
        orderProducts: [
            {
                count: 2,
                productId: "8e2a99f0-9e7d-4adc-a5ec-0535b5e52d69"
            }
        ]
    });

    let res = http.post(url, body, { headers: headers });

    // Checar se a resposta foi bem-sucedida
    check(res, {
        'is status 200': (r) => r.status === 200
    });

    // Coletar tempo de resposta
    responseTimeTrend.add(res.timings.duration);

    if (res.status === 200) {
        let responseBody = JSON.parse(res.body);
        let orderId = responseBody.orderId;

        let orderUrl = `${url}?orderId=${orderId}`;
        let orderRes = http.get(orderUrl, { headers: headers });

        // Checar se a resposta foi bem-sucedida
        check(orderRes, {
            'is status 200': (r) => r.status === 200
        });

        // Coletar tempo de resposta
        responseTimeTrend.add(orderRes.timings.duration);

        console.log(orderRes.body);
    }

    sleep(1); // Pausa de 1 segundo entre as iterações
}
