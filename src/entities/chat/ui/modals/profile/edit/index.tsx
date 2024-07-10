import React from 'react';

import { BaseTypes } from 'shared/types';

import styles from './styles.module.scss';
import { useEasyState } from '../../../../../../shared/hooks';
import { Avatar, Button, Input, InputTypes, Title } from '../../../../../../shared/ui';
import { ChatProxy } from '../../../../model/types';

type Props = {
    getScreenshot: (preview: string, file: File) => void;
    clickAvatar: () => void;
    selectFile: () => void;
    chat: ChatProxy | BaseTypes.Empty;
    inputs: {
        chatName: InputTypes.UseReturnedType;
        description: InputTypes.UseReturnedType;
    };
    send: () => void;
} & BaseTypes.Statuses;

function EditChatModalView(props: Props) {
    const { send, inputs, getScreenshot, selectFile, chat, clickAvatar, disabled } = props;

    return (
        <div className={styles.wrapper} style={{ pointerEvents: disabled ? 'none' : 'auto' }}>
            <div className={styles.container}>
                <div className={styles.avatar}>
                    <Avatar.Change
                        menuFixed
                        clickAvatar={clickAvatar}
                        // dropdownLeft={90}
                        size={145}
                        img={chat?.avatar || ''}
                        name={chat?.name || ''}
                        deleteFile={() => ''}
                        selectFile={selectFile}
                        getScreenshot={getScreenshot}
                    />
                </div>
                <div className={styles.description}>
                    <Title variant="H4R" primary={false}>
                        Название и описание
                    </Title>
                    <Input placeholder="Название" {...inputs.chatName} />
                    <Input placeholder="Описание" rows={3} {...inputs.description} />
                </div>
            </div>
            <Button onClick={send}>Сохранить</Button>
        </div>
    );
}

export default EditChatModalView;
