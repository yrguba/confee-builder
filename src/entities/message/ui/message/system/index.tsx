import React, { forwardRef } from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';

type Props = {
    text: string;
} & BaseTypes.Statuses;

const SystemMessageView = forwardRef((props: Props, ref: any) => {
    const { text } = props;

    return (
        <div ref={ref} className={styles.wrapper}>
            {text}
        </div>
    );
});

export default SystemMessageView;
