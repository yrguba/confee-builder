export type Chat = {
    id: number;
    name: string;
    avatar: string;
    message: any;
    created_at: Date;
    updated_at: Date;
    is_group: boolean;
    users: number[];
};

export type ChatCardIcons = 'check';
