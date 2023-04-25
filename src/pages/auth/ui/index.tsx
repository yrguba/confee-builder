import React from 'react';

import { SwitchThemes } from 'features/app';
import { LoginFromAuthPage } from 'widgets/auth-page';

import styles from './styles.module.scss';

function AuthPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <LoginFromAuthPage />
            </div>
        </div>
    );
}

export default AuthPage;
