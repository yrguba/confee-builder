import { userTypes } from 'entities/user';

import { Statuses } from '../../user/model/types';

export type Viewer = {} & userTypes.User;

export type Contact = {
    id: number;
    first_name: string | null;
    last_name: string | null;
    avatar: string | null;
    phone: string | null;
    owner: number;
    user_id: number;
    contact_name: string | null;
    status: Statuses | null;
    created_at: Date;
    updated_at: Date;
};

export type ContactProxy = {
    full_name: string;
} & Contact;

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
