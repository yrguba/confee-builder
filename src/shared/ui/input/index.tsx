import cn from 'classnames';
import cnBind from 'classnames/bind';
import React, { ForwardRefExoticComponent } from 'react';

import InternalInput from './input';
import Password from './password';
import Search from './search';
import styles from './styles.module.scss';
import { InputComponentProps, GetInputPropsReturned } from './types';

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

const Input = InternalInput as CompoundedComponent;

Input.Password = Password;
Input.Search = Search;

export default Input;
