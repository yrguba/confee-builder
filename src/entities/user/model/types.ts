export enum Statuses {
    'IN_OFFICE' = '#29CC39',
    'HOME_WORK' = '#8833FF',
    'BUSINESS_TRIP' = '#33BFFF',
    'VACATION' = '#2EE5C9',
    'SICK_LEAVE' = '#EFF2F7',
    'NOT_AVAILABLE' = '#E62E7B',
    'ONLINE' = '#0000ff',
    'OFFLINE' = '',
}

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

export type SocketIn = 'UserUpdated';
export type SocketOut = '';
