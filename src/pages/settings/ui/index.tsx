import React, { Fragment } from 'react';

import { AppService } from 'entities/app';
import { Box } from 'shared/ui';
import { HeaderFromSettingsPage, MainFromSettingsPage, PrivacyFromSettingsPage, CheckUpdate, ApplicationFromSettingsPage } from 'widgets/settings-page';

import styles from './styles.module.scss';
import Wrapper from '../../wrapper';

function SettingsPage() {
    const items = [
        { id: 0, element: <MainFromSettingsPage /> },
        { id: 1, element: <PrivacyFromSettingsPage /> },
        { id: 2, element: <ApplicationFromSettingsPage /> },
        { id: 3, element: AppService.tauriIsRunning ? <CheckUpdate /> : null },
    ];

    return (
        <Wrapper>
            <div className={styles.wrapper}>
                <div className={styles.header}>
                    <HeaderFromSettingsPage />
                </div>
                <Box.Animated visible className={styles.mainRow}>
                    {items.map((i) => (
                        <div key={i.id} className={styles.row} style={{ display: !AppService.tauriIsRunning && i.id === 3 ? 'none' : 'flex' }}>
                            {i.element}
                        </div>
                    ))}
                </Box.Animated>
            </div>
        </Wrapper>
    );
}

export default SettingsPage;
