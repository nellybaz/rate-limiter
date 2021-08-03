import { Request, Response } from 'express';
import config from '../../config';
import { RateLimit } from '../services/rate-limit.service';
const userMap = new Map();
const redis = require('async-redis');

const client = redis.createClient({
    host: config.server.redisHost,
    port: config.server.redisPort,
    password: config.server.redisPassword
});

client.on('error', function (error: any) {
    console.log('redis error');
    console.error(error);
});

client.on('connect', () => {
    console.log('Redis connected!!');
});
export interface IRateLimitOptions {
    durationUnit: Duration;
    limit: number;
    duration: number;
}

export enum Duration {
    sec,
    month
}

export function rateLimit(options: IRateLimitOptions) {
    return (target: any, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
        const originalFunc = descriptor.value;
        descriptor.value = function (): any {
            const request: Request = arguments[0];
            const response: Response = arguments[1];

            // ideally, a userId is gotten from the jwt or any other auth service used
            const user = RateLimit.getUserKey(request.body.user || 'default', options);
            const userLimit = options.limit;
            const that = this;
            const expiry = RateLimit.getExpiry(user, options);
            return new Promise(async (resolve, _) => {
                try {
                    const reply = await client.get(user);
                    
                    if (reply == null) {
                        const set = await client.set(user, '1', 'PX', expiry);
                        return resolve(originalFunc.apply(that, [request, response]));
                    } else {
                        const userCount = parseInt(reply);
                        if (userCount >= userLimit) return resolve(response.status(429).json({ message: 'limit exceeded' }));
                        await client.set(user, (userCount + 1).toString(), 'KEEPTTL');
                        return resolve(originalFunc.apply(that, [request, response]));
                    }
                } catch (error) {
                    console.log(error);
                    return resolve(response.status(429).json({ message: 'limit exceeded' }));
                }
            });
        };
        return descriptor;
    };
}
