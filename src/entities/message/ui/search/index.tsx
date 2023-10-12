import React from 'react';
import { useUpdateEffect } from 'react-use';

import { dateConverter, getEnding } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { useInView } from '../../../../shared/hooks';
import messageProxy from '../../lib/proxy';
import { Message, MessageProxy } from '../../model/types';

type Props = {
    close: () => void;
    searchInput: InputTypes.UseReturnedType;
    messages: Message[];
    getNextPage: () => void;
} & BaseTypes.Statuses;

function SearchMessagesView(props: Props) {
    const { getNextPage, close, searchInput, messages } = props;

    const { ref: lastMessage, inView: inViewLastMessage } = useInView({ delay: 200 });

    useUpdateEffect(() => {
        inViewLastMessage && getNextPage();
    }, [inViewLastMessage]);

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <div className={styles.title}>
                    <Button.Circle variant="inherit" radius={28} onClick={close}>
                        <Icons variant="close" />
                    </Button.Circle>
                    <Title variant="H2">Поиск сообщений</Title>
                </div>
                <div className={styles.search}>
                    <Input {...searchInput} clearIcon prefixIcon="search" />
                </div>
            </div>

            <div className={styles.messages}>
                {messages?.map((i, index) => (
                    <div key={i.id} className={styles.item}>
                        <Title variant="caption1M">{dateConverter(i.created_at)}</Title>
                        <Title variant="caption1M">{i.text}</Title>
                    </div>
                ))}
                <div ref={lastMessage} />
            </div>
        </div>
    );
}

export default SearchMessagesView;
