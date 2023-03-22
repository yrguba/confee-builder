import React from 'react';

import { ProfileInfoPage, MediaInfoPage } from 'widgets/info-page';

import styles from './styles.module.scss';

function InfoPage() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.profile}>
                <ProfileInfoPage />
            </div>
            <div className={styles.media}>
                <MediaInfoPage />
            </div>
        </div>
    );
}

export default InfoPage;
