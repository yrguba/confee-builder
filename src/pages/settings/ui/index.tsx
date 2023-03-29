import React from 'react';

import { HeaderFromSettingsPage, MainFromSettingsPage } from 'widgets/settings-page';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function SettingsPage() {
    return (
        <Wrapper>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <HeaderFromSettingsPage />
                </div>
                <div className={styles.mainRow}>
                    <div className={styles.main}>
                        <MainFromSettingsPage />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default SettingsPage;
