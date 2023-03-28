import { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from 'react';

import { baseTypes } from '../../types';

export type InputAttrs = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type InputValue = InputAttrs['value'];

type Size = number | 's' | 'm' | 'l' | 'xl';

type Shared = {
    size?: Size;
} & InputAttrs &
    baseTypes.Statuses;

export type WrapperProps = {
    children: ReactNode;
    size?: Size;
} & baseTypes.Statuses;

export type BaseInputProps = {} & Shared;

export type PasswordInputProps = {} & Shared;

export type TextareaInputProps = {} & TextareaHTMLAttributes<HTMLTextAreaElement> & baseTypes.Statuses;

export type SearchInputProps = {
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
} & Shared;
