import { validationResult, header, body } from 'express-validator';
import { Response } from './response';

export class Validations {

    constructor() { }

    private response: Response = new Response;


    // **************************** EXAMPLE **************************** //
    public example = () => [
        header('authorization').not().isEmpty().withMessage('authorization is required'),
        body('email').not().isEmpty().withMessage('email is required'),
        body('email').isEmail().withMessage('wrong format'),
        body('name').isString().withMessage('name must be text'),
        body('name').not().isEmpty().withMessage('name is required'),
        body('details').not().isEmpty().withMessage('details is required'),
        body('details').isString().withMessage('details must be text')
    ]
    // ***************************************************************** //

    public testValidations = () => [
        header('authorization').not().isEmpty().withMessage('authorization is required'),
        body('name').isString().withMessage('name must be text'),
        body('name').not().isEmpty().withMessage('name is required'),
    ]

  
    /**
     * @method checkValidations
     * @description Realiza la revisión de las validaciones
     */
    public checkValidations = (req: any, res: any) => {

        const errors = validationResult(req);
        if (!errors.isEmpty())
            this.response.badRequest(res, errors);
    }


}//class