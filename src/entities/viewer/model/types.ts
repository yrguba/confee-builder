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
