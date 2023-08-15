import { userTypes } from 'entities/user';

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
export type Modals = {
    viewerPersonalInfo: null;
    changeName: null;
    changeNickname: null;
    changeBirth: null;
    changeEmail: null;
    contacts: null;
    addContact: null;
    changeAboutMe: null;
    changePhone: null;
};
