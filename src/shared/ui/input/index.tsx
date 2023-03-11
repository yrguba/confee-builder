import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { ForwardRefExoticComponent } from 'react';

import { InputComponentProps, GetInputPropsReturned } from './types';
import InputBase from './ui/base';
import Password from './ui/password';
import Search from './ui/search';
import styles from './ui/styles.module.scss';

export const getBase = (props: InputComponentProps): GetInputPropsReturned => {
    const { loading, error, size, ...inputAttrs } = props;
    const inputProps = { loading, error, size };

    const classes = cn(
        cnBind.bind(styles)('wrapper', {
            loading: props.loading,
            error: props.error,
            [`size-${props.size}`]: props.size,
        })
    );

    return { classes, inputProps, inputAttrs };
};

type CompoundedComponent = ForwardRefExoticComponent<InputComponentProps> & {
    Password: typeof Password;
    Search: typeof Search;
};

const Input = InputBase as CompoundedComponent;

Input.Password = Password;
Input.Search = Search;

export default Input;
