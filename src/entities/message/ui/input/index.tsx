import React from 'react';

import { BaseTypes } from 'shared/types';
import { Button, Input, Emoji, Box, Dropdown } from 'shared/ui';

import Icons from './icons';
import InputMenuView from './menu';
import styles from './styles.module.scss';
import { MessageProxy } from '../../model/types';

type Props = {
    messageToEdit: MessageProxy | null;
    messageToReply: MessageProxy | null;
    removeMessageToEdit: () => void;
    removeMessageToReply: () => void;
    onKeyDown: (arg: any) => void;
    onChange: (arg: any) => void;
    btnClick: (arg?: any) => void;
    setIsOpenEmojiPicker: (arg: boolean) => void;
    setIsOpenInputMenu: (arg: boolean) => void;
    clickOnEmoji: (arg?: any) => void;
    value: string;
} & BaseTypes.Statuses;

function MessageInputView(props: Props) {
    const {
        messageToEdit,
        messageToReply,
        removeMessageToEdit,
        removeMessageToReply,
        onKeyDown,
        setIsOpenEmojiPicker,
        setIsOpenInputMenu,
        clickOnEmoji,
        btnClick,
        onChange,
        value,
        loading,
    } = props;

    const isVisibleHeader = !!messageToEdit || !!messageToReply;

    const exit = () => {
        removeMessageToEdit();
        removeMessageToReply();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.inputColumn}>
                <Box.Animated visible={isVisibleHeader} animationVariant="autoHeight" transition={{ type: 'tween' }} className={styles.header}>
                    <div className={styles.exitIcon} onClick={exit}>
                        <Icons variants="exit" />
                    </div>
                    <div className={styles.mainColumn}>
                        <div className={styles.title}>
                            {messageToEdit ? (
                                'Редактирование'
                            ) : (
                                <div className={styles.title__answer}>
                                    <Icons variants="answer" size={16} />
                                    {messageToReply?.user.name}
                                </div>
                            )}
                        </div>
                        <div style={{ marginLeft: messageToReply ? 20 : 0 }} className={styles.messageText}>
                            {messageToEdit?.text || messageToReply?.text}
                        </div>
                    </div>
                </Box.Animated>

                <div className={`${styles.input} ${isVisibleHeader && styles.isVisibleHeader}`}>
                    <div className={styles.body}>
                        <Dropdown openCloseTrigger={setIsOpenInputMenu} position="right-top" content={<InputMenuView />}>
                            <div className={styles.icon}>
                                <Icons variants="clip" />
                            </div>
                        </Dropdown>
                        <div className={styles.textarea}>
                            <Input.Textarea defaultValue={messageToEdit?.id} value={value} onChange={onChange} onKeyDown={onKeyDown} />
                        </div>
                        <div className={styles.emoji}>
                            <Emoji openCloseTrigger={setIsOpenEmojiPicker} clickOnEmoji={clickOnEmoji} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.btnColumn}>
                <div className={styles.sendBtn}>
                    <Button.Circle disabled={!value || loading} active onClick={btnClick}>
                        <Icons variants="arrow" />
                    </Button.Circle>
                </div>
            </div>
        </div>
    );
}

export default MessageInputView;
