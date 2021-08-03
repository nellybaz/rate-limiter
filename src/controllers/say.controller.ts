import { inject, injectable } from 'inversify';
import { httpGet, controller, httpPost, TYPE } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { rateLimit } from '../decorators/rate-limiter.decorator';

@controller('/say')
export class SayController {
    constructor() {}

    @rateLimit({ limit: 1 })
    @httpGet('/')
    sayHi(req: any, res: any) {
        return res.status(200).json({ message: 'ok' });
    }

    @rateLimit({ limit: 1 })
    @httpPost('/')
    post(req: any, res: any) {
        return res.status(200).json({ message: 'ok' });
    }
}
