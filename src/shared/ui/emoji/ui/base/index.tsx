import EmojiPicker, { Emoji, Theme } from 'emoji-picker-react';
import React from 'react';

import { useTheme } from 'shared/hooks';

import Dropdown from '../../../dropdown';
import { BaseEmojiProps } from '../../types';

function EmojiBase(props: BaseEmojiProps) {
    const { openCloseTrigger, clickOnEmoji, position = 'left-top' } = props;
    const [activeTheme] = useTheme();
    return (
        <Dropdown
            openCloseTrigger={openCloseTrigger}
            position={position}
            content={<EmojiPicker theme={activeTheme === 'light' ? Theme.LIGHT : Theme.DARK} onEmojiClick={(data) => clickOnEmoji(data.emoji)} />}
        >
            <Emoji unified="1f642" />
        </Dropdown>
    );
}

export default EmojiBase;
