import React, { Fragment } from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Image } from '../../../../shared/ui';
import { ChatTypes, ChatCardView } from '../../../chat';
import { ChatProxy } from '../../../chat/model/types';
import { MediaContentType } from '../../../message/model/types';

type Props = {
    type: MediaContentType | undefined;
    data: any;
} & BaseTypes.Statuses;

function MediaContentModal(props: Props) {
    const { type, data } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{type}s</div>
            <div className={styles.list}>
                {data?.length &&
                    type &&
                    data.map((file: any) => (
                        <Fragment key={file.id}>
                            {type === 'image' && <Image size={120} img={file.previewUrl} />}
                            {type === 'audio' && <div>audio</div>}
                        </Fragment>
                    ))}
            </div>
        </div>
    );
}

export default MediaContentModal;
