import axios from 'axios';
import { Const, URL } from './const';
import { Response } from './response';


export class HtppRequest {

    constructor() { }

    url: URL = new URL();
    response: Response = new Response()
    const: Const = new Const();
    
    /**
     * @method getAuth
     * @memberof HtppRequest
     * @description Consumes Auth microservice to check authentication status
     * 
     */
    public getAuth = async (res: any, authToken: string): Promise<any> => {
        const config = {
            headers: { authorization: authToken },
            timeout: this.const.timeout
        }
        try {
            await axios.get(this.url.authorization, config);
            return true;
        }
        catch (error) {
            
            if (error.code === undefined)
                //return res.send(401, error.response.data)
                return this.response.unauthorized(res)

            return this.response.timeoutError(res, error);
        }
    }
}