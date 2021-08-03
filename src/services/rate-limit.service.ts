import { Duration, IRateLimitOptions } from '../decorators/rate-limiter.decorator';
import { UserLimitService } from './user-limit.service';

export class RateLimit {
    static getExpiry = (user: string, options: IRateLimitOptions): number => {
        let expiry = options.duration;

        if (options.durationUnit == Duration.month) {
            // ideally, userLimitService should be injected to help with testing
            // and to keep the system decoupled, but
            //for this test, we just initialize it below
            const userSetLimit = new UserLimitService(user).getMonthlyLimit();
            expiry = userSetLimit.limit * 60 * 60 * 24 * 30;
        }

        return expiry * 1000;
    };

    static getUserKey = (user: string, options: IRateLimitOptions): string => {
        const userKeySec = user + '_sec';
        const userKeyMonth = user + '_month';
        return options.durationUnit == Duration.month ? userKeyMonth : userKeySec;
    };
}
