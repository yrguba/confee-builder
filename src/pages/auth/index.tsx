import React from 'react';

import { LoginWidget } from 'widgets/auth';

import styles from './styles.module.scss';

function AuthPage() {
    return (
        <div className={styles.auth}>
            <LoginWidget />
        </div>
    );
}

export default AuthPage;
