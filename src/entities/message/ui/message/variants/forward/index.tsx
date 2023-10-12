import React from 'react';

import { BaseTypes } from 'shared/types';
import { Title, TitleTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../../model/types';

type Props = {
    message: MessageProxy;
    nameTitleVariant: TitleTypes.TitleVariants;
} & BaseTypes.Statuses;

function ForwardMessage(props: Props) {
    const { nameTitleVariant, message } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.description}>
                <Title active variant={nameTitleVariant}>
                    {`Переслано от ${message.authorName}`}
                </Title>
            </div>
        </div>
    );
}

export default ForwardMessage;
