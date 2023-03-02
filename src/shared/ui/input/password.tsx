import React, { forwardRef, useState } from 'react';

import Icons from './icons';
import styles from './styles.module.scss';
import { PasswordProps } from './types';

import { wrapperClasses, getProps } from './index';

const Input = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
    const [showPass, toggleShowPass] = useState<boolean>(false);

    const { baseProps, inputAttrs } = getProps(props);

    const classes = wrapperClasses(baseProps);

    return (
        <div className={classes}>
            <input
                onFocus={(event) => event.target.removeAttribute('readOnly')}
                type={showPass ? 'text' : 'password'}
                readOnly
                ref={ref}
                className={styles.input}
                {...inputAttrs}
            />
            <div onClick={() => toggleShowPass((prev) => !prev)}>
                <Icons variants={showPass ? 'visiblePass' : 'hiddenPass'} />
            </div>
        </div>
    );
});

export default Input;
