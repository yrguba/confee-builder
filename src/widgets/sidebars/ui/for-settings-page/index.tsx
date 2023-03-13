import React from 'react';

import { SettingsPageNavigation } from 'features/navbars';

import styles from './styles.module.scss';

function SidebarForSettingsPage() {
    return (
        <div className={styles.sidebar}>
            <div className={styles.nav}>
                <SettingsPageNavigation />
            </div>
        </div>
    );
}

export default SidebarForSettingsPage;
