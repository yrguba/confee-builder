import { userTypes } from 'entities/user';

export type ModalName =
    | 'viewer-personal-info'
    | 'change-name'
    | 'change-nickname'
    | 'change-birth'
    | 'change-email'
    | 'contacts'
    | 'add-contact'
    | 'change-about-me'
    | 'change-phone';

export type Viewer = {} & userTypes.User;

export type Contact = {
    id: number;
    first_name: string | null;
    last_name: string | null;
    phone: string | null;
    owner: number;
    user_id: number;
    contact_name: string | null;
    created_at: Date;
    updated_at: Date;
};
