import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { BaseTypes } from '../../types';

export type InputAttrs = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type InputValue = InputAttrs['value'];

type Size = number | 's' | 'm' | 'l' | 'xl';

type Shared = {
    size?: Size;
    title?: string;
    errorTitle?: string;
} & InputAttrs &
    BaseTypes.Statuses;

export type WrapperProps = {
    children: ReactNode;
    size?: Size;
    title?: string;
    errorTitle?: string;
} & BaseTypes.Statuses;

export type BaseInputProps = {} & Shared;

export type InputDatePickerProps = {} & Shared;

export type PasswordInputProps = {} & Shared;

export type TextareaInputProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement> & BaseTypes.Statuses;

export type SearchInputProps = {
    mini?: boolean;
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
} & Shared;
