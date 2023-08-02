import { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

import use from './use';
import { BaseTypes } from '../../../types';
import { IconsTypes } from '../../icons';

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

export type TextareaInputProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement> & Shared;
export type UseReturnedType = ReturnType<typeof use>;