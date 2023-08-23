import React, { ReactNode } from 'react';

import { BaseTypes } from 'shared/types';
import { Image, Title } from 'shared/ui';

import styles from './styles.module.scss';

type Props = {
    content: string;
    children: ReactNode;
    preview: any;
} & BaseTypes.Statuses;

function LinkInfo(props: Props) {
    const { content, children, preview } = props;

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.link}
                onClick={() => {
                    window.open(content, '_blank');
                }}
            >
                {children}
            </div>
            <div className={styles.info}>
                <div className={styles.description}>
                    <Title variant="H3M">{preview?.siteName || 'Неопределенно'}</Title>
                    <Title variant="H4S">{preview?.title || 'Неопределенно'}</Title>
                    <Title variant="Body14">{preview?.description || 'Небезопасный ресурс !'}</Title>
                </div>
                <div className={styles.img}>
                    <Image width="70px" height="70px" url={preview?.images?.length ? preview?.images[0] : ''} />
                </div>
            </div>
        </div>
    );
}

export default LinkInfo;
