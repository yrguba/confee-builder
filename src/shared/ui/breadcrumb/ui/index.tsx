import React, { Fragment } from 'react';

import styles from './styles.module.scss';
import { BreadcrumbProps } from '../types';

function Breadcrumb(props: BreadcrumbProps) {
    const { items, onClick } = props;

    return (
        <div className={styles.wrapper}>
            {items.map((i, index: number) => (
                <Fragment key={index}>
                    <div className={styles.item} onClick={() => onClick(i)}>
                        {i.name}
                    </div>
                    {index + 2 <= items.length && <div>/</div>}
                </Fragment>
            ))}
        </div>
    );
}

export default Breadcrumb;
