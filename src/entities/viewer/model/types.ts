import { userTypes } from 'entities/user';

export type Viewer = {
    onesignal: string;
} & userTypes.User;

export type ViewerProxy = {
    full_name: string;
    full_avatar_url: string;
    formatted_birth: string | null;
} & Viewer;
