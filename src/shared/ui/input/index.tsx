import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { ForwardRefExoticComponent } from 'react';

import InternalInput from './input';
import Password from './password';
import Search from './search';
import styles from './styles.module.scss';
import { BaseProps, GetInputPropsReturned, InputAttrs } from './types';

const cx = cnBind.bind(styles);

export const getProps = (props: InputAttrs & BaseProps): GetInputPropsReturned => {
    const { isLoading, isError, $size, ...inputAttrs } = props;
    const baseProps = { isLoading, isError, $size };

    return { baseProps, inputAttrs };
};

export const wrapperClasses = (props: BaseProps) =>
    cn(
        cx('wrapper', {
            loading: props.isLoading,
            error: props.isError,
            [`size-${props.$size}`]: props.$size,
        })
    );

type CompoundedComponent = ForwardRefExoticComponent<any> & {
    Password: typeof Password;
    Search: typeof Search;
};

const Input = InternalInput as CompoundedComponent;

Input.Password = Password;
Input.Search = Search;

export default Input;
