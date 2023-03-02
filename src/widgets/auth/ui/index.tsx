import React from 'react';

import { LoginFeature } from 'features/auth';
import { Link } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {};

function LoginWidget(props: Props) {
    return (
        <div className={styles.login}>
            <LoginFeature />
        </div>
    );
}

export default LoginWidget;
