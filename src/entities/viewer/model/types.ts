import { userTypes } from 'entities/user';

export type Viewer = {
    onesignal: string;
} & userTypes.User;

export type Session = {
    browser: string;
    created_at: Date;
    device_name: string;
    device_type: string;
    id: string;
    is_current: boolean;
    last_activity: Date;
    location: string;
    os_name: string;
    user_id: number;
};

export type ViewerProxy = {
    full_name: string;
    full_avatar_url: string;
    formatted_birth: string | null;
} & Viewer;
