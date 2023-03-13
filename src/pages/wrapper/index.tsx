import React, { ReactNode } from 'react';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';

function Wrapper({ children }: { children: ReactNode }) {
    return (
        <div className={styles.globalWrapper}>
            <Box.Animated visible presenceProps={{ mode: 'wait' }} className={styles.pagesWrapper}>
                {children}
            </Box.Animated>
        </div>
    );
}

export default Wrapper;
