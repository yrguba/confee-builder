import React, { ReactNode } from 'react';

import styles from './styles.module.scss';
import { Box } from '../../shared/ui';

function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className={styles.globalWrapper}>
            <Box.Animated visible className={styles.pagesWrapper}>
                {children}
            </Box.Animated>
        </div>
    );
}

export default Wrapper;
