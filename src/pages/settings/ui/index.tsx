import React from 'react';

import { ApplicationService } from 'entities/application';
import { HeaderFromSettingsPage, MainFromSettingsPage, PrivacyFromSettingsPage, CheckUpdate, ApplicationFromSettingsPage } from 'widgets/settings-page';

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
                    <div className={styles.privacy}>
                        <PrivacyFromSettingsPage />
                    </div>
                    {ApplicationService.tauriIsRunning && (
                        <div className={styles.checkUpdate}>
                            <CheckUpdate />
                        </div>
                    )}
                    <div className={styles.application}>
                        <ApplicationFromSettingsPage />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
}

export default SettingsPage;
