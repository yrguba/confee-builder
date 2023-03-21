import React, { ReactNode } from 'react';

import styles from './styles.module.scss';

function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className={styles.globalWrapper}>
            <div className={styles.pagesWrapper}>{children}</div>
        </div>
    );
}

export default Wrapper;
