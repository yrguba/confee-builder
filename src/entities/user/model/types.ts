export type UserStatuses = 'in-office' | 'home-work' | 'business-trip' | 'vacation' | 'sick-leave' | 'meeting' | 'not-available';

export type User = {
    avatars: any[];
    birth: string;
    contact_name: string;
    created_at: Date;
    email: string;
    first_name: string;
    id: number;
    is_online: boolean;
    last_active: Date;
    last_name: string;
    nickname: string;
    phone: string;
    updated_at: Date;
};
