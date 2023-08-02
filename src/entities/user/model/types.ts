export type UserStatuses = 'in-office' | 'home-work' | 'business-trip' | 'vacation' | 'sick-leave' | 'meeting' | 'not-available';

export type ModalName = 'personal-info';

export type User = {
    avatar: {
        chat_id: number | null;
        user_id: number | null;
        created_at: Date;
        update_at: Date;
        id: number;
        path?: string;
    };
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
