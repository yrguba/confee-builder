import { UserTypes } from 'entities/user';

export type ModalName = 'personal-info' | 'change-name';
export type Viewer = {} & UserTypes.User;
