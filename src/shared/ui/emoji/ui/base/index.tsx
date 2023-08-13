import EmojiPicker, { Emoji, Theme, EmojiStyle } from 'emoji-picker-react';
import React from 'react';

import { useTheme } from 'shared/hooks';

import Dropdown from '../../../dropdown';
import Icons from '../../../icons';
import { BaseEmojiProps } from '../../types';

function EmojiBase(props: BaseEmojiProps) {
    const { openCloseTrigger, clickOnEmoji, position = 'left-top' } = props;
    const [activeTheme] = useTheme();

    const click = (data: any) => {
        clickOnEmoji(data.emoji);
    };
    return (
        <Dropdown
            left={40}
            openCloseTrigger={openCloseTrigger}
            position={position}
            content={<EmojiPicker emojiStyle={EmojiStyle.NATIVE} theme={activeTheme === 'light' ? Theme.LIGHT : Theme.DARK} onEmojiClick={click} />}
        >
            <Icons variant="emoji" />
        </Dropdown>
    );
}

export default EmojiBase;
