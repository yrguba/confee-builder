import React from 'react';

import { MessageStoreTypes } from 'entities/message';
import { BaseTypes } from 'shared/types';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { getEnding } from '../../../../shared/lib';

type Props = {
    highlightedMessages: MessageStoreTypes['highlightedMessages'];
    clickDeleteMessages: () => void;
    clickForwardMessages: () => void;
} & BaseTypes.Statuses;

function HighlightedMessagesView(props: Props) {
    const { highlightedMessages, clickDeleteMessages, clickForwardMessages, loading } = props;

    return (
        <Box.Animated visible={!!highlightedMessages.value.length} animationVariant="autoHeight" className={styles.wrapper}>
            <div className={styles.btns}>
                <div className={styles.btn} onClick={clickForwardMessages}>
                    <Title active variant="H3S">
                        Переслать
                    </Title>
                </div>
                <div className={styles.btn} onClick={clickDeleteMessages}>
                    <Title color="red" variant="H3S">
                        Удалить
                    </Title>
                </div>
            </div>
            <div className={styles.text}>
                <Title variant="H3S" textAlign="center">
                    {`Выбрано ${highlightedMessages.value.length} ${getEnding(highlightedMessages.value.length, ['сообщение', 'сообщения', 'сообщений'])}`}
                </Title>
            </div>
            <div className={styles.cancel} onClick={highlightedMessages.clear}>
                <Title active variant="H3S">
                    Отмена
                </Title>
            </div>
        </Box.Animated>
    );
}

export default HighlightedMessagesView;
