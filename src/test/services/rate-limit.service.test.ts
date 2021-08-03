import { expect } from 'chai';
import { Duration, IRateLimitOptions } from '../../decorators/rate-limiter.decorator';
import { RateLimit } from '../../services/rate-limit.service';

describe('Rate limit expiry', () => {
    it('returns rate limit for seconds', () => {
        const options: IRateLimitOptions = { duration: 3, limit: 1, durationUnit: Duration.sec };
        const actual = RateLimit.getExpiry(options);
        expect(actual).to.eq(3 * 1000);
    });

    it('returns rate limit for months', () => {
        const options: IRateLimitOptions = { duration: 3, limit: 1, durationUnit: Duration.month };
        const actual = RateLimit.getExpiry(options);
        expect(actual).to.eq(60 * 60 * 24 * 30 * 3 * 1000);
    });
});

describe('Rate limit user key', () => {
    it('returns userkey for seconds', () => {
        const options: IRateLimitOptions = { duration: 3, limit: 1, durationUnit: Duration.sec };
        const actual = RateLimit.getUserKey('123', options);
        expect(actual).to.eq('123_sec');
    });

    it('returns userkey for months', () => {
        const options: IRateLimitOptions = { duration: 3, limit: 1, durationUnit: Duration.month };
        const actual = RateLimit.getUserKey('123', options);
        expect(actual).to.eq('123_month');
    });
});
