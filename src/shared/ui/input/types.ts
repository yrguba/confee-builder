import { InputHTMLAttributes } from 'react';

export type IconVariants = 'hiddenPass' | 'visiblePass' | 'search' | null;

export type InputAttrs = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type InputValue = InputAttrs['value'];

export interface BaseProps {
    isLoading?: boolean;
    isError?: boolean;
    $size?: 's' | 'm' | 'l' | 'xl';
}

export interface InputProps extends InputAttrs, BaseProps {}

export interface PasswordProps extends InputAttrs, BaseProps {}

export interface SearchProps extends InputAttrs, BaseProps {
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
}

export type GetInputPropsReturned = {
    baseProps: BaseProps;
    inputAttrs: InputAttrs;
};
