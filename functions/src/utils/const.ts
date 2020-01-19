export class URL {

    // Dev enviroment
    END_POINT = 'https://us-central1-proyecto-cardumen.cloudfunctions.net'

    authorization = `${this.END_POINT}/authorization`;
}


export class Const {
    constructor() { }

    timeout: number = 10000;
    microservice : string = 'microservice'
}




export class CodeResponse {

    constructor(){}

        // Internal code 
    SUCCESS = '01';
    BAD_REQUEST = '02';
    UNAUTHORIZED = '03';
    TIMEOUT = '05';
    SERVER_ERROR = '06'


        // message     
    SUCCESS_MESSAGE = 'success';
    BAD_REQUEST_MESSAGE = 'bad request';
    UNAUTHORIZED_MESSAGE = 'unauthorized';
    TIMEOUT_MESSAGE = 'timeout error';
    SERVER_ERROR_MESSAGE  = 'server error'

        // Http codes
    SUCCESS_HTTP = 200;
    BAD_REQUEST_HTTP = 400;
    UNAUTHORIZED_HTTP = 401;
    SERVER_HTTP  = 500;
    TIMEOUT_HTTP = 504;
    

    



}