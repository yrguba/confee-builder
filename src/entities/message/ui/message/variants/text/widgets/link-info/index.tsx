import React, { ReactNode, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useShell } from 'shared/hooks';
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
    const previewImg = useEasyState('');

    useUpdateEffect(() => {
        if (preview.faviconBuffer?.data) {
            favicon.set(fileConverter.arrayBufferToBlobLocalPath(new Uint8Array(preview.faviconBuffer.data)));
        }
        if (preview.previewBuffer?.data) {
            previewImg.set(fileConverter.arrayBufferToBlobLocalPath(new Uint8Array(preview.previewBuffer.data)));
        }
    }, [preview]);

    return (
        <div
            className={styles.wrapper}
            onClick={() => {
                openBrowser(content);
            }}
        >
            <div className={styles.link}>{children}</div>
            <div className={styles.info}>
                <div className={styles.description}>
                    <Title textWrap variant="H2">
                        {preview?.siteName || 'Неопределенно'}
                    </Title>
                    <Title textWrap variant="H3S">
                        {preview?.title || 'Неопределенно'}
                    </Title>
                    <Title variant="Body14">{preview?.description || 'Неопределенно'}</Title>
                    {previewImg.value && <Image maxWidth="100%" height="auto" url={previewImg.value} />}
                </div>
                {!previewImg.value && (
                    <div className={styles.img}>
                        <Image width="70px" height="70px" url={favicon.value} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default LinkInfo;
