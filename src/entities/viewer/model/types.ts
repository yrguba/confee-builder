import { userTypes } from 'entities/user';

export type ModalName = 'viewer-personal-info' | 'change-name' | 'change-nickname' | 'change-birth' | 'change-email' | 'contacts' | 'add-contact';
export type Viewer = {} & userTypes.User;
