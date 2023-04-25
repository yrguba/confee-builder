import React from 'react';

import { BaseTypes } from 'shared/types';
import { ResponsiveMediaContents } from 'shared/ui';

import styles from './styles.module.scss';
import { MediaContentType } from '../../../message/model/types';

type Props = {
    type: MediaContentType | undefined;
    list: string[] | undefined;
} & BaseTypes.Statuses;

function MediaContentModal(props: Props) {
    const { type, list } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>{type && list?.length && <ResponsiveMediaContents type={type as any} list={list} />}</div>
        </div>
    );
}

export default MediaContentModal;
