import React, { Fragment, useState } from 'react';

import { useSelected } from 'shared/hooks';
import { baseTypes } from 'shared/types';
import { Box } from 'shared/ui';

import { Chat } from '../../model/types';

type Props = {
    chats: Chat[];
    clickOnChat: (arg: Chat) => void;
} & baseTypes.Statuses;

function ChatListView(props: Props) {
    const { chats, clickOnChat, loading, error } = props;

    const item = {
        name: 'awdwad',
        lastMsg: 'awdwad',
    };

    const [openTabs, setOpenTabs] = useSelected({ multiple: true });

    const arr: any = [
        { id: 0, name: 'chats', items: chats },
        { id: 1, name: 'chanel', items: chats },
        { id: 2, name: 'users', items: chats },
    ];

    const click = (i: any) => {
        setOpenTabs(i.id);
    };

    return (
        <div>
            {arr.map((panel: any) => (
                <Fragment key={panel.id}>
                    <div onClick={() => click(panel)}>{panel.name}</div>
                    <Box.Animated animationVariant="autoHeight" visible={openTabs.includes(panel.id)}>
                        {panel.items.map((chat: any, index: number) => (
                            <div onClick={() => clickOnChat(chat)} key={index}>
                                {chat.name}
                            </div>
                        ))}
                    </Box.Animated>
                </Fragment>
            ))}
        </div>
    );
}

export default ChatListView;
