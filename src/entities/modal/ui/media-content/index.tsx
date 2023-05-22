import React from 'react';

import { BaseTypes } from 'shared/types';
import { Document, ResponsiveMediaContents } from 'shared/ui';

import styles from './styles.module.scss';
import { MediaContentType } from '../../../message/model/types';

type Props = {
    type: keyof typeof MediaContentType | undefined;
    list: { url: string; name: string }[] | undefined;
} & BaseTypes.Statuses;

function MediaContentModal(props: Props) {
    const { type, list } = props;

    return <div className={styles.wrapper}>{type === 'document' && list?.map((i) => <Document url={i.url} name={i.name} size={0} />)}</div>;
}

export default MediaContentModal;
