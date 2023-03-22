export type UserStatuses = 'in-office' | 'home-work' | 'business-trip' | 'vacation' | 'sick-leave' | 'meeting' | 'not-available';

export type User = {
    id: number;
    name: string;
    avatar: string;
    email: string;
    login: string;
    updated_at: Date;
    created_at: Date;
    domain: string;
    guid: string;
};
