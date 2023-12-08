import EmojiPicker, { Emoji, Theme, EmojiStyle } from 'emoji-picker-react';
import React from 'react';

import { useEasyState, useTheme } from 'shared/hooks';

import Dropdown from '../../../dropdown';
import Icons from '../../../icons';
import { BaseEmojiProps } from '../../types';

function EmojiBase(props: BaseEmojiProps) {
    const { openCloseTrigger, clickOnEmoji, position = 'left-top' } = props;
    const theme = useTheme();
    const visibleMenu = useEasyState(false);
    const click = (data: any) => {
        clickOnEmoji(data.emoji);
        console.log(data);
    };
    return (
        <>
            <Dropdown
                visible={visibleMenu.value}
                openCloseTrigger={openCloseTrigger}
                position={position}
                content={<EmojiPicker emojiStyle={EmojiStyle.NATIVE} theme={theme.value === 'light' ? Theme.LIGHT : Theme.DARK} onEmojiClick={click} />}
            />
            <Icons variant="emoji" />
        </>
    );
}

export default EmojiBase;
