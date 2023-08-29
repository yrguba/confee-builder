import React from 'react';

import styles from './styles.module.scss';

function SizeWarningPage() {
    return (
        <div className={styles.wrapper}>
            <p>минимальная ширина: 450px</p>
            <p>минимальная высота: 470px</p>
        </div>
    );
}

export default SizeWarningPage;
