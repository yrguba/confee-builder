import { getClient, ResponseType } from '@tauri-apps/api/http';
import React, { ReactNode, useEffect } from 'react';
import { useUpdateEffect } from 'react-use';

import { useEasyState, useShell } from 'shared/hooks';
import { regex } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Image, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { fileConverter } from '../../../../../../../../shared/lib';
import { appService } from '../../../../../../../app';

type Props = {
    content: string;
    children: ReactNode;
    preview: any;
} & BaseTypes.Statuses;

function LinkInfo(props: Props) {
    const { content, children, preview } = props;

    const { openBrowser } = useShell();

    const previewImg = useEasyState('');

    useUpdateEffect(() => {
        if (preview?.images?.length && appService.tauriIsRunning) {
            getClient().then((client) => {
                client
                    .get(preview.images[0], {
                        responseType: ResponseType.Binary,
                    })
                    .then((res) => {
                        previewImg.set(fileConverter.arrayBufferToBlobLocalPath(new Uint8Array(res.data as any)));
                    });
            });
        }
    }, [preview]);

    const isYoutube = regex.youTubeUrl.test(preview?.fullUrl);

    return (
        <div
            className={styles.wrapper}
            onClick={() => {
                openBrowser(content);
            }}
        >
            <div className={styles.link}>{children}</div>
            {preview?.siteName && (
                <div className={styles.info}>
                    <div className={styles.description}>
                        <Title textWrap variant="H2">
                            {preview?.siteName || 'Неопределенно'}
                        </Title>
                        <Title textWrap variant="H3S">
                            {preview?.title || 'Неопределенно'}
                        </Title>
                        <Title variant="Body14">{preview?.description || 'Неопределенно'}</Title>
                        {isYoutube && <Image maxWidth="100%" height="auto" url={previewImg.value} />}
                    </div>
                    {!isYoutube && (
                        <div className={styles.img}>
                            <Image width="70px" height="70px" url={previewImg.value} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default LinkInfo;
