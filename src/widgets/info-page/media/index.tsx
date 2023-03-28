import React from 'react';
import { useParams } from 'react-router';

import { UserImagesList } from 'features/user';

import styles from './styles.module.scss';

function MediaInfoPage() {
    const params = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                <UserImagesList />
            </div>
        </div>
    );
}

export default MediaInfoPage;
