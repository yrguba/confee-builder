import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { BaseTypes } from '../../types';

export type InputAttrs = Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'width' | 'height'>;

export type InputValue = InputAttrs['value'];

type Size = number | 's' | 'm' | 'l' | 'xl' | 'xxl';

type Shared = {
    size?: Size;
    width?: string | number;
    height?: string | number;
    title?: string;
    errorTitle?: string;
} & InputAttrs &
    BaseTypes.Statuses;

export type WrapperProps = {
    children: ReactNode;
    size?: Size;
    width?: string | number;
    height?: string | number;
    title?: string;
    errorTitle?: string;
} & BaseTypes.Statuses;

export type BaseInputProps = {
    clearIcon?: boolean;
    prefix?: string;
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
} & Shared;

export type InputDatePickerProps = {} & Shared;

export type PasswordInputProps = {} & Shared;

export type TextareaInputProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement> & Shared;

export type SearchInputProps = {
    mini?: boolean;
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
} & Shared;
