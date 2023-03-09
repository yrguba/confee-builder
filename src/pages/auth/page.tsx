import React from 'react';

import { LoginForm } from 'features/auth';
import { SwitchThemes } from 'features/switch';

import styles from './styles.module.scss';

function AuthPage() {
    return (
        <div className={styles.auth}>
            <div className={styles.switch}>
                <SwitchThemes />
            </div>
            <LoginForm />
        </div>
    );
}

export default AuthPage;
