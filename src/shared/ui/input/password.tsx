import React, { forwardRef, useState } from 'react';

import { Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { PasswordProps } from './types';

import { getBase } from './index';

const Input = forwardRef<HTMLInputElement, PasswordProps>((props, ref) => {
    const [showPass, toggleShowPass] = useState<boolean>(false);

    const { classes, inputAttrs } = getBase(props);

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
                <Icons.Input variants={showPass ? 'visiblePass' : 'hiddenPass'} />
            </div>
        </div>
    );
});

export default Input;
