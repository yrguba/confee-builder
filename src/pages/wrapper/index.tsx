import React, { ReactNode } from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className={styles.globalWrapper}>
            <div className={styles.pagesWrapper}>{children}</div>
        </div>
    );
}

export default Wrapper;
