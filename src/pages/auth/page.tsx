import React from 'react';

import { LoginFeature } from 'features/auth';
import { SwitchThemesFeature } from 'features/switch';

import styles from './styles.module.scss';

function AuthPage() {
    return (
        <div className={styles.auth}>
            <div className={styles.switch}>
                <SwitchThemesFeature />
            </div>
            <LoginFeature />
        </div>
    );
}

export default AuthPage;
