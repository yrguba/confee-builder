import React from 'react';
import { useParams } from 'react-router';

import styles from './styles.module.scss';

function MediaInfoPage() {
    const params = useParams();

    return <div className={styles.wrapper}>MediaInfoPage</div>;
}

export default MediaInfoPage;
