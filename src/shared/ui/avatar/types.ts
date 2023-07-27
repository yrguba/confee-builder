import { UserTypes } from '../../../entities/user';
import { BaseTypes } from '../../types';

export type AvatarProps = {
    size?: number;
    name?: string;
    img: string;
    circle?: boolean;
};

export type AvatarChangeProps = {
    user: UserTypes.User | BaseTypes.Empty;
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    deleteFile: () => void;
    avatar?: string;
};
