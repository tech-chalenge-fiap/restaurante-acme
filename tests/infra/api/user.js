import http from 'k6/http';
import { check, fail, sleep } from "k6";

export const getUser = () => {
    const headers = { 'Authorization': '' }
    let res = http.get('http://localhost:4080/api/clients/?id=10016', { headers: headers })

    if(!check(res, {
        'is statuscode 200 - enpoint clients': (r) => r.status === 200
    })){
        fail('Test scenario execution failed');
    }
    sleep(1);
}