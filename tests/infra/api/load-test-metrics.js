import { getClient }from "./clients.js";
import { group } from 'k6';


export default() =>{

  group('Endpoint Get Client - API k6', () => {
    getClient();
  });

}