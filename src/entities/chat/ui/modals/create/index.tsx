import React from 'react';

import { UseEasyStateReturnedType } from 'shared/hooks';
import { BaseTypes } from 'shared/types';
import { Button, Input } from 'shared/ui';

import styles from './styles.module.scss';
import { ChatProxy } from '../../../model/types';

type Props = {
    chatState: UseEasyStateReturnedType<{ user_ids: number[] | null; is_group: boolean }>;
    createChat: () => void;
} & BaseTypes.Statuses;

function CreateChatModalView(props: Props) {
    const { chatState, createChat, loading } = props;

    return (
        <div className={styles.wrapper}>
            <Input onChange={(e) => chatState.set({ user_ids: [Number(e.target.value)], is_group: false })} />
            <Button loading={loading} disabled={loading} onClick={createChat}>
                create
            </Button>
        </div>
    );
}

export default CreateChatModalView;
