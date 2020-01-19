import { ErrorResponse } from "../models/error.model"
import { CodeResponse, Const } from './const';
import { SuccessResponse } from "../models/response.model";
import { ConsoleError } from '../models/consoleError.model';

export class Response {

    constructor() { }

    CODE_RESPONSE : CodeResponse = new CodeResponse();
    CONST : Const = new Const();


     /**
     * @method success
     * @memberof Response
     * @description Response when param's request are wrong
     * @param {any} res Response
     * @param {any} errors Erros to show in response
     */
    public success = (res: any, data: any) => {
        const response: SuccessResponse = {
            response: {
                code: this.CODE_RESPONSE.SUCCESS,
                message: this.CODE_RESPONSE.SUCCESS_MESSAGE,
                data
            }
        }
        return res.send(this.CODE_RESPONSE.SUCCESS_HTTP, response)
    }

    /**
     * @method badRequest
     * @memberof Response
     * @description Response when param's request are wrong
     * @param {any} res Response
     * @param {any} errors Erros to show in response
     */
    public badRequest = (res: any, errors: any) => {
        const response: ErrorResponse = {
            response: {
                code: this.CODE_RESPONSE.BAD_REQUEST,
                message: this.CODE_RESPONSE.BAD_REQUEST_MESSAGE,
                data: null,
                errors: errors.array()
            }
        }
        return res.send(this.CODE_RESPONSE.BAD_REQUEST_HTTP, response)
    }

     /**
     * @method serverError
     * @memberof Response
     * @description Response when server had any error
     * @param {any} res Response
     */
    public serverError = (res: any, error:any) => {

        const response : ErrorResponse = {

            response: {
                code: this.CODE_RESPONSE.SERVER_ERROR,
                message: this.CODE_RESPONSE.SERVER_ERROR_MESSAGE,
                data: null,
                errors: null
            }
        }
         const consoleError: ConsoleError = {
          error,
          microservice: this.CONST.microservice,
        }; 
        
        console.error(consoleError)
        res.send(this.CODE_RESPONSE.SERVER_HTTP, response)
    }


         /**
     * @method unauthorized
     * @memberof Response
     * @description Response when request is unauthorized
     * @param {any} res Response
     */
    public unauthorized = (res: any) => {

        const response : ErrorResponse= {

            response: {
                code: this.CODE_RESPONSE.UNAUTHORIZED,
                message : this.CODE_RESPONSE.UNAUTHORIZED_MESSAGE,
                data: null,
                errors: null
            }
        }
        res.send(this.CODE_RESPONSE.UNAUTHORIZED_HTTP, response)
    }

     /**
     * @method timeoutError
     * @memberof Response
     * @description Response when timeout error
     * @param {any} res Response
     * @param {any} error Erros to show in response
     */
    public timeoutError = (res: any, error: any) => {
        const response: ErrorResponse = {
            response: {
                code: this.CODE_RESPONSE.TIMEOUT,
                message: this.CODE_RESPONSE.TIMEOUT_MESSAGE,
                data: null,
                errors: null
            }
        }
        return res.send(this.CODE_RESPONSE.TIMEOUT_HTTP, response)
    }

}//class