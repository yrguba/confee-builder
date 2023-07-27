import { UserTypes } from '../../../entities/user';
import { BaseTypes } from '../../types';

export type AvatarProps = {
    size?: number;
    name?: string;
    img: string;
    circle?: boolean;
};

export type AvatarChangeProps = {
    selectFile: () => void;
    getScreenshot: (data: string) => void;
    deleteFile: () => void;
} & AvatarProps;
