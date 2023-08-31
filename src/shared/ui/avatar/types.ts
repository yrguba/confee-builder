import { userTypes } from '../../../entities/user';
import { BaseTypes } from '../../types';

export type BaseAvatarProps = {
    size?: number;
    name?: string;
    img: string | BaseTypes.Empty;
    circle?: boolean;
    status?: keyof typeof userTypes.Statuses | null;
    opacity?: 0 | 1;
};

export type AvatarChangeProps = {
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    deleteFile: () => void;
} & BaseAvatarProps;
