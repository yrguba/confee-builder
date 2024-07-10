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
    height?: string;
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
    callbackPhone?: (phone: string | number) => void;
    onFocus?: (value: boolean) => void;
    onlyType?: 'number' | 'letters';
    resetFocusError?: boolean;
};

export type BaseInputProps = {
    clearIcon?: boolean;
    prefix?: string;
    prefixIcon?: IconsTypes.BaseIconsVariants;
    debounceDelay?: number;
    debounceCallback?: (arg: InputValue) => void;
    clear?: () => void;
    reload?: any;
    callbackPhone?: (phone: string | number) => void;
    focus?: (value: boolean) => void;
    rows?: number;
    setValue: (val: string) => void;
} & Shared;

export type PhoneInputProps = {
    callbackPhone?: (phone: string | number) => void;
} & Shared;

export type TextareaInputProps = {
    focus?: boolean;
    focusTrigger: any[];
    textVariant?: 'H3M' | 'H4M';
    textChange?: (value: string) => void;
    value: string | number;
    pressEnter?: (text: string) => void;
    pressEnterAndCtrl?: (text: string, position: number) => void;
    lineBreak?: 'enter' | 'enterAndCtrl';
    visibleEmoji?: boolean;
    maxRows?: number;
    clickAway?: () => void;
    setCursorPosition?: (pos: number) => void;
} & Shared;

export type UseReturnedType = ReturnType<typeof use>;
