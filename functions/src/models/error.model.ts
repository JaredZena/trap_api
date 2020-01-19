
export interface ErrorResponse {

    response: {
        code: string
        message: string | null
        data: object | null,
        errors: Array<any> | null
    }
}

/* interface Error {
    value?: string,
    msg: string,
    param: string,
    location: string
} */