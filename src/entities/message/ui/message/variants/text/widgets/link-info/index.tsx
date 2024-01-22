import React, { ReactNode, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

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
    const previewImg = useEasyState('');

    useUpdateEffect(() => {
        if (preview.faviconBuffer?.data) {
            fileConverter.arrayBufferToBlobLocalPath(new Uint8Array(preview.faviconBuffer.data)).then((url) => favicon.set(url));
        }
        if (preview.previewBuffer?.data) {
            fileConverter.arrayBufferToBlobLocalPath(new Uint8Array(preview.previewBuffer.data)).then((url) => previewImg.set(url));
        }
    }, [preview]);
    console.log(preview);

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
                    <Title variant="H2">{preview?.siteName || 'Неопределенно'}</Title>
                    <Title textWrap variant="H3S">
                        {preview?.title || 'Неопределенно'}
                    </Title>
                    <Title variant="Body14">{preview?.description || 'Неопределенно'}</Title>
                    {previewImg.value && <Image width="370px" height="370px" url={previewImg.value} />}
                </div>
                <div className={styles.img}>{!previewImg.value && <Image width="70px" height="70px" url={favicon.value} />}</div>
            </div>
        </div>
    );
}

export default LinkInfo;
