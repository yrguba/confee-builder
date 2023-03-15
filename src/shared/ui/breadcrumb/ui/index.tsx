import React, { useEffect, useRef } from 'react';

import styles from './styles.module.scss';
import { BreadcrumbProps } from '../types';

function Breadcrumb(props: BreadcrumbProps) {
    const { items } = props;
    console.log(items);
    return (
        <div className={styles.wrapper}>
            {items.map((i, index: number) => (
                <span key={index}>daw</span>
            ))}
        </div>
    );
}

export default Breadcrumb;
