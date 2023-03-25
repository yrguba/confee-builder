import React, { ReactNode, useEffect } from 'react';
import { io } from 'socket.io-client';

import { baseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { http } from '../../../../shared/constanst';
import { useReactQuerySubscription } from '../../../../shared/hooks';
import { TokenService } from '../../../../shared/services';
import { Button } from '../../../../shared/ui';
import { Massage } from '../../model/types';
import TextMessageView from '../message/text';

type Props = {
    messages: Massage[];
    getPage: (arg: 'prev' | 'next') => void;
} & baseTypes.Statuses;

function MessagesListView(props: Props) {
    const { messages, getPage } = props;

    return (
        <div>
            {messages.map((message) => (
                <TextMessageView message={message} key={message.id} />
            ))}
            <div>
                <Button onClick={() => getPage('prev')}>prev</Button>
                <Button onClick={() => getPage('next')}>next</Button>
            </div>
        </div>
    );
}

export default MessagesListView;
