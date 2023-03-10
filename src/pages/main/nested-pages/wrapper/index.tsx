import React, { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';

import styles from './styles.module.scss';

type Props = {
    sidebar: ReactNode;
    header: ReactNode;
};

function Wrapper(props: Props) {
    const { sidebar, header } = props;
    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>{sidebar}</div>
            <div className={styles.mainColumn}>
                <div className={styles.header}>{header}</div>
                <div className={styles.outlet}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Wrapper;
