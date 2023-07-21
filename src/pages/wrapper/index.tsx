import React, { ReactNode } from 'react';

import styles from './styles.module.scss';
import { Box } from '../../shared/ui';

function Wrapper({ children, className }: { children: ReactNode; className?: string }) {
    return (
        <div className={styles.globalWrapper}>
            <div className={`${styles.pagesWrapper} ${className}`}>{children}</div>
        </div>
    );
}

export default Wrapper;
