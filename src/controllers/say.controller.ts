import { inject, injectable } from 'inversify';
import { httpGet, controller, httpPost, TYPE } from 'inversify-express-utils';
import TYPES from '../../config/types';
import { Duration, rateLimit } from '../decorators/rate-limiter.decorator';

@controller('/say')
export class SayController {
    constructor() {}

    @rateLimit({ durationUnit: Duration.sec, limit: 1, duration: 1 })
    @httpGet('/')
    sayHi(req: any, res: any) {
        return res.status(200).json({ message: 'ok' });
    }

    @rateLimit({ durationUnit: Duration.sec, limit: 2, duration: 5 })
    @httpGet('/limit2')
    limit2(req: any, res: any) {
        return res.status(200).json({ message: 'ok' });
    }

    @rateLimit({ durationUnit: Duration.sec, limit: 1, duration: 5 })
    @httpPost('/')
    post(req: any, res: any) {
        return res.status(200).json({ message: 'ok' });
    }

    @rateLimit({ durationUnit: Duration.sec, limit: 10, duration: 1 })
    @rateLimit({ durationUnit: Duration.month, limit: 1, duration: 1 })
    @httpPost('/month')
    month(req: any, res: any) {
        return res.status(200).json({ message: 'ok' });
    }
}
