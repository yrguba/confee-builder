import moment from 'moment';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useUpdateEffect } from 'react-use';

import { dateConverter, getEnding } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Button, Icons, Input, Title, InputTypes } from 'shared/ui';

import styles from './styles.module.scss';
import { useInView } from '../../../../shared/hooks';
import { viewerStore } from '../../../viewer';
import messageProxy from '../../lib/proxy';
import { Message, MessageProxy } from '../../model/types';

type Props = {
    close: () => void;
    searchInput: InputTypes.UseReturnedType;
    messages: Message[];
    getNextPage: () => void;
    clickMessage: (message: Message) => void;
} & BaseTypes.Statuses;

function SearchMessagesView(props: Props) {
    const { clickMessage, getNextPage, close, searchInput, messages } = props;

    const viewer = viewerStore.use.viewer();

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
            {searchInput.value && messages.length === 0 && (
                <div className={styles.noFound}>
                    <Icons.Picture size={338} text="Сообщений не найдено" variant="not-found" />
                </div>
            )}
            {messages.length ? (
                <div className={styles.messages}>
                    {messages?.map((i, index) => (
                        <div key={i.id} className={styles.item} onClick={() => clickMessage(i)}>
                            <div className={styles.date}>
                                <Title primary={false} variant="caption1M">
                                    {moment(i.created_at).calendar().split(',')[0]}
                                </Title>
                            </div>
                            <div className={styles.msg}>
                                {viewer.value.id === i.author.id && <Icons variant={i.users_have_read.length ? 'double-check' : 'check'} />}
                                <Highlighter
                                    highlightClassName={styles.highlight}
                                    className={styles.text}
                                    searchWords={[searchInput.value]}
                                    autoEscape
                                    textToHighlight={i.text}
                                />
                            </div>

                            {/* <Title variant="H4M">{i.text}</Title> */}
                        </div>
                    ))}
                    <div ref={lastMessage} />
                </div>
            ) : null}
        </div>
    );
}

export default SearchMessagesView;
