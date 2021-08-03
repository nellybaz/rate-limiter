import { inject, injectable } from 'inversify';
import {httpGet, controller, httpPost, TYPE} from 'inversify-express-utils'
import TYPES from '../../config/types';

@controller('/say')
export class SayController {
    constructor(){}
    
    @httpGet('/')
    sayHi(req: any, res: any) {
        return res.send('hi');
    }
}