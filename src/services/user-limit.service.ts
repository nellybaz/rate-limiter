export interface IUserLimit {
    limit: number;
}

export class UserLimitService {
    constructor(userId: string) {}
    getMonthlyLimit(): IUserLimit {
        // Get the actual user monthly limit set
        return {
            limit: 300
        };
    }
}
