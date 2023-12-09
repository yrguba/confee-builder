import EmojiPicker, { Emoji, Theme, EmojiStyle } from 'emoji-picker-react';
import React from 'react';

import { useEasyState, useTheme } from 'shared/hooks';

import Dropdown from '../../../dropdown';
import Icons from '../../../icons';
import { BaseEmojiProps } from '../../types';

function EmojiBase(props: BaseEmojiProps) {
    const { openCloseTrigger, clickOnEmoji } = props;

    const theme = useTheme();

    const visibleMenu = useEasyState(false);

    const click = (data: any) => {
        clickOnEmoji(data.emoji);
    };
    return (
        <>
            <Dropdown
                clickAway={() => visibleMenu.set(false)}
                trigger="click"
                reverseY
                reverseX
                visible={visibleMenu.value}
                openCloseTrigger={openCloseTrigger}
                content={<EmojiPicker emojiStyle={EmojiStyle.NATIVE} theme={theme.value === 'light' ? Theme.LIGHT : Theme.DARK} onEmojiClick={click} />}
            />
            <div onClick={() => visibleMenu.set(true)}>
                <Icons variant="emoji" />
            </div>
        </>
    );
}

export default EmojiBase;
