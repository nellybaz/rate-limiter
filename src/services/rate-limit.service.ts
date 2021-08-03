import { Duration, IRateLimitOptions } from '../decorators/rate-limiter.decorator';

export class RateLimit {
    static getExpiry = (options: IRateLimitOptions): number => {
        let expiry = options.duration;

        if (options.durationUnit == Duration.month) {
            expiry *= 60 * 60 * 24 * 30;
        }

        return expiry * 1000;
    };

    static getUserKey = (user: string, options: IRateLimitOptions): string => {
        const userKeySec = user + '_sec';
        const userKeyMonth = user + '_month';
        return options.durationUnit == Duration.month ? userKeyMonth : userKeySec;
    };
}
