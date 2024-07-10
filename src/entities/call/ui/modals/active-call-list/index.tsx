import React from 'react';

import { ChatProxy } from 'entities/chat/model/types';
import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../shared/hooks';
import { Avatar, Button, Title } from '../../../../../shared/ui';
import { appService } from '../../../../app';
import { ViewerProxy } from '../../../../viewer/model/types';
import { callApi, callTypes } from '../../../index';
import { CallInActiveCallList } from '../../../model/types';

type Props = {
    chat: ChatProxy | null;
    viewer: ViewerProxy;
    action: (imInRoom: boolean, call: callTypes.CallInActiveCallList) => void;
} & BaseTypes.Statuses;

function ActiveCallListModalView(props: Props) {
    const { action, chat, viewer } = props;

    return (
        <div className={styles.wrapper}>
            <div className={styles.list}>
                {chat?.calls?.map((i) => {
                    const found = i?.member_ids?.includes(viewer.id);
                    return (
                        <div key={i.id} className={styles.item}>
                            <Members chatId={chat?.id} callId={i.id} />
                            <Button onClick={() => action(found, i)} height="30px">
                                {found ? 'Покинуть' : 'Войти'}
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function Members(props: { chatId?: number; callId?: number }) {
    const { data: callData } = callApi.handleGetCall({ chatId: props.chatId, callId: props.callId });

    return (
        <div className={styles.members}>
            {callData?.members?.map((i: any) => (
                <div key={i.id} className={styles.member}>
                    <Avatar size={30} img={i?.avatar} />
                    <div key={i.id} className={styles.name}>
                        <Title variant="caption1M">{i?.first_name}</Title>
                        <Title variant="caption1M">{i?.last_name}</Title>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default ActiveCallListModalView;
