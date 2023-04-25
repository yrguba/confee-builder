import React, { ReactNode } from 'react';

import { http } from 'shared/constanst';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Image } from '../../../../../shared/ui';
import useGetRows from '../../../lib/useGetRows';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function ImageMessageView(props: Props) {
    const { message, reactionClick } = props;

    const rows = useGetRows(message.content);

    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper} style={{ gridTemplateColumns: `repeat(${message.content.length < 2 ? 1 : 2}, 1fr)` }}>
                {rows.map((row) => (
                    <div key={row.id} className={styles.row}>
                        {row.columns.map((column) => (
                            <div key={column.id} style={{ width: column.width, height: column.height }} className={styles.column}>
                                <Image img={http.url + column.url} />
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default ImageMessageView;
