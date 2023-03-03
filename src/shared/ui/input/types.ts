import { InputHTMLAttributes } from 'react';

export type IconVariants = 'hiddenPass' | 'visiblePass' | 'search' | null;

export type InputAttrs = Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>;

export type InputValue = InputAttrs['value'];

export interface InputProps {
    loading?: boolean;
    disabled?: boolean;
    error?: boolean;
    size?: number | 's' | 'm' | 'l' | 'xl';
}

export type InputComponentProps = InputAttrs & InputProps;

export interface PasswordProps extends InputComponentProps {}

export interface SearchProps extends InputComponentProps {
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
}

export type GetInputPropsReturned = {
    classes: string;
    inputProps: InputProps;
    inputAttrs: InputAttrs;
};
