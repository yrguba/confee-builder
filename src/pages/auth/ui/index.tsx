import React from 'react';

import { LoginForm } from 'features/auth';
import { SwitchThemes } from 'features/switch';
import { Icons } from 'shared/ui';

import styles from './styles.module.scss';

function AuthPage() {
    return (
        <div className={styles.auth}>
            <div className={styles.switch}>
                <SwitchThemes />
            </div>
            <div className={styles.wrapper}>
                <Icons.Logo variants="tfn" />
                <LoginForm />
            </div>
        </div>
    );
}

export default AuthPage;
