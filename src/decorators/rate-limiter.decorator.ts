import { Request, Response } from 'express';
const userMap = new Map();

export interface IRateLimit {
    limit: number;
}

export function rateLimit(limit: IRateLimit) {
    return (target: any, propertyKey: PropertyKey, descriptor: TypedPropertyDescriptor<any>) => {
        const originalFunc = descriptor.value;
        descriptor.value = function (): any {
            const request: Request = arguments[0];
            const response: Response = arguments[1];

            const user = request.body.user;

            if (userMap.has(user)) {
                const userCount = userMap.get(user);
                if (userCount >= limit.limit) return response.status(429).json({ message: 'limit exceeded' });
                userMap.set(user, userCount + 1);
            } else {
                userMap.set(user, 1);
            }
            originalFunc.apply(this, [request, response]);
        };
        return descriptor;
    };
}
