import React from 'react';
import { useParams } from 'react-router';

import { ChatImagesList } from 'features/chat';

import styles from './styles.module.scss';

function FilesListFromUserInfoPage() {
    const params = useParams();

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>FilesListFromUserInfoPage</div>
        </div>
    );
}

export default FilesListFromUserInfoPage;
