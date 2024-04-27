import { getUser }from "./user.js";
import { group } from 'k6';


export default() =>{

  group('Endpoint Get User - API k6', () => {
    getUser();
  });

}