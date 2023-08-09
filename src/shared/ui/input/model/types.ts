import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import use from './use';
import { BaseTypes } from '../../../types';
import { Types as IconsTypes } from '../../icons';

export type InputAttrs = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width' | 'height'>;

export type InputValue = InputAttrs['value'];

type Size = number | 's' | 'm';

type Shared = {
    size?: Size;
    width?: string | number;
    height?: string | number;
    title?: string;
    errorTitle?: string;
    asyncValidate?: any;
    setError?: any;
} & InputAttrs &
    BaseTypes.Statuses;

export type UseProps = {
    initialValue?: string;
    yupSchema?: any;
    realtimeValidate?: boolean;
    debounceDelay?: number;
    callback?: (arg: InputValue) => void;
};

export type BaseInputProps = {
    clearIcon?: boolean;
    prefix?: string;
    prefixIcon?: IconsTypes.BaseIconsVariants;
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
    clear?: () => void;
    reload?: any;
} & Shared;

export type CountriesInputProps = {
    getCode: (code: string) => void;
} & Shared;

export type TextareaInputProps = {
    focus?: boolean;
    id?: number | string | undefined;
} & TextareaHTMLAttributes<HTMLTextAreaElement> &
    Shared;
export type UseReturnedType = ReturnType<typeof use>;
