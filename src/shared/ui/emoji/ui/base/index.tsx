import EmojiPicker, { Emoji, Theme } from 'emoji-picker-react';
import React from 'react';

import { useTheme } from 'shared/hooks';

import Dropdown from '../../../dropdown';
import Icons from '../../../icons';
import { BaseEmojiProps } from '../../types';

function EmojiBase(props: BaseEmojiProps) {
    const { openCloseTrigger, clickOnEmoji, position = 'left-top' } = props;
    const [activeTheme] = useTheme();
    return (
        <Dropdown
            left={40}
            openCloseTrigger={openCloseTrigger}
            position={position}
            content={<EmojiPicker theme={activeTheme === 'light' ? Theme.LIGHT : Theme.DARK} onEmojiClick={(data) => clickOnEmoji(data.emoji)} />}
        >
            <Icons variant="emoji" />
        </Dropdown>
    );
}

export default EmojiBase;
