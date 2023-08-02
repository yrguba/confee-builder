import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { BaseTypes } from '../../types';
import { IconsTypes } from '../icons';

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

export type InputDatePickerProps = {} & Shared;

export type PasswordInputProps = {} & Shared;

export type TextareaInputProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement> & Shared;

export type SearchInputProps = {
    mini?: boolean;
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
} & Shared;
