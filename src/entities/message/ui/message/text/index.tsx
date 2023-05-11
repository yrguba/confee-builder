import Linkify from 'linkify-react';
import React, { useEffect, useState } from 'react';

import { UserDossierView, UserTypes } from 'entities/user';
import { BaseTypes } from 'shared/types';
import { Modal, useModal } from 'shared/ui';

import styles from './styles.module.scss';
import { MessageProxy } from '../../../model/types';
import Wrapper from '../wrapper';
import 'linkify-plugin-mention';

type Props = {
    chatUsers?: UserTypes.User[] | BaseTypes.Empty;
    message: MessageProxy;
    wrapper?: boolean;
    reactionClick?: (messageId: number, reaction: string) => void;
} & BaseTypes.Statuses;

function TextMessageView(props: Props) {
    const { message, wrapper = true, reactionClick, chatUsers } = props;

    const [user, setUser] = useState<UserTypes.User | null>(null);
    const userInfoModal = useModal();

    const options = {
        render: {
            mention: ({ attributes, content }: any) => {
                const { href, ...props } = attributes;
                return (
                    <span
                        onClick={() => {
                            const found = chatUsers?.find((user) => user.nickname === href.substring(1));
                            found && setUser(found);
                        }}
                        className={styles.tag}
                        {...props}
                    >
                        {content}
                    </span>
                );
            },
        },
    };

    useEffect(() => {
        user ? userInfoModal.open() : userInfoModal.close();
    }, [user]);

    function Message() {
        return (
            <div className={styles.wrapper}>
                <Linkify options={options}>{message.text}</Linkify>
            </div>
        );
    }

    return (
        <>
            {!wrapper ? (
                <Message />
            ) : (
                <Wrapper message={message} reactionClick={reactionClick || (() => {})}>
                    <Message />
                </Wrapper>
            )}
            <Modal {...userInfoModal} onOk={() => setUser(null)} onClose={() => setUser(null)}>
                <UserDossierView direction="column" user={user} />
            </Modal>
        </>
    );
}

export default TextMessageView;
