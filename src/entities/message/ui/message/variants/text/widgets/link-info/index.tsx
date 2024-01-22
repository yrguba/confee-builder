import React, { ReactNode, useEffect } from 'react';

import { useEasyState, useNodeFetch, useShell } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Image, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { fileConverter } from '../../../../../../../../shared/lib';

type Props = {
    content: string;
    children: ReactNode;
    preview: any;
} & BaseTypes.Statuses;

function LinkInfo(props: Props) {
    const { content, children, preview } = props;

    const { openBrowser } = useShell();

    const favicon = useEasyState('');
    const { fetchContent } = useNodeFetch();

    useEffect(() => {
        if (preview?.faviconBuffer.data) {
            const u8a = new Uint8Array(preview?.faviconBuffer.data as any);
            fileConverter.arrayBufferToBlobLocalPath(u8a).then((e) => {
                favicon.set(e);
            });
        } else if (preview?.favicons.length) {
            fetchContent(preview?.favicons[3] || preview?.favicons[2] || preview?.favicons[1] || preview?.favicons[0]).then((e) => {
                e && favicon.set(e);
            });
        }
    }, [preview]);

    return (
        <div className={styles.wrapper}>
            <div
                className={styles.link}
                onClick={() => {
                    openBrowser(content);
                }}
            >
                {children}
            </div>
            <div className={styles.info}>
                <div className={styles.description}>
                    <Title variant="H2">{preview?.siteName || 'Неопределенно'}</Title>
                    <Title textWrap variant="H3S">
                        {preview?.title || 'Неопределенно'}
                    </Title>
                    <Title variant="Body14">{preview?.description || 'Неопределенно'}</Title>
                </div>
                <div className={styles.img}>
                    <Image width="70px" height="70px" url={favicon.value} />
                </div>
            </div>
        </div>
    );
}

export default LinkInfo;
