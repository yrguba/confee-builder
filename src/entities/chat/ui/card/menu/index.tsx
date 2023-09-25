import moment from 'moment';
import React, { useEffect } from 'react';

import { useArray, useEasyState } from 'shared/hooks';
import { getEnding } from 'shared/lib';
import { BaseTypes } from 'shared/types';
import { Box, IconsTypes, Icons, Title, Emoji, Card } from 'shared/ui';

import styles from './styles.module.scss';
import { createMemo } from '../../../../../shared/hooks';
import { userProxy } from '../../../../user';
import { UserProxy, User } from '../../../../user/model/types';
import { ChatProxy, Actions } from '../../../model/types';

type Props = {
    chat: ChatProxy;
    chatMenuAction: (action: Actions, chat: ChatProxy) => void;
} & BaseTypes.Statuses;

const memoReadUsers = createMemo((users: User[] | BaseTypes.Empty, users_ids: number[]) => {
    const arr: UserProxy[] = [];
    users?.forEach((user) => {
        if (users_ids.includes(user.id)) {
            arr.push(userProxy(user) as any);
        }
    });
    return arr;
});

function ChatMenu(props: Props) {
    const { chatMenuAction, chat } = props;

    const items: BaseTypes.Item<IconsTypes.BaseIconsVariants, Actions>[] = [{ id: 0, title: 'Удалить', icon: 'delete', payload: 'delete' }];
    const reactions = ['1f4a3', '1f440', '26d4', '1f49c', '1f4a5', '1f34c', '1f44c', '1f44d'];

    const visibleAllReactions = useEasyState(false);
    const visibleUsers = useEasyState(false);

    return (
        <div className={styles.wrapper}>
            <div className={styles.items}>
                {items.map((i) => (
                    <div key={i.id} className={styles.item} onClick={() => chatMenuAction(i.payload, chat)} onMouseEnter={() => visibleUsers.set(true)}>
                        <Icons variant={i.icon} />
                        <Title variant="H3M">{i.title}</Title>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatMenu;
