import React, { ReactNode } from 'react';

import { http } from 'shared/constanst';
import { useDate } from 'shared/hooks';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { Image } from '../../../../../shared/ui';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';

type Props = {
    message: MessageProxy;
    reactionClick: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function ImageMessageView(props: Props) {
    const { message, reactionClick } = props;
    // size={index === 0 || index % 3 === 0 ? 168 : 83}
    return (
        <Wrapper message={message} reactionClick={reactionClick}>
            <div className={styles.wrapper}>
                {message.content.map((obj, index) => (
                    <div className={`${styles.item} ${index === 0 || index % 3 === 0 ? styles.item_big : ''}`}>
                        <Image img={http.url + obj.url} />
                    </div>
                ))}
            </div>
        </Wrapper>
    );
}

export default ImageMessageView;
