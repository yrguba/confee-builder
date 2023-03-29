import React from 'react';

import { LoginForm } from 'features/auth';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function LoginFromAuthPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.logo}>
                <Icons.Logo variants="tfn" />
            </div>
            <div className={styles.form}>
                <LoginForm />
            </div>
        </div>
    );
}

export default LoginFromAuthPage;
