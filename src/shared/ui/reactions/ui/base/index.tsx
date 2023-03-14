import EmojiPicker from 'emoji-picker-react';
import React from 'react';

import { ReactionCounterProps } from '../../types';

function ReactionCounter(props: ReactionCounterProps) {
    const { onClick } = props;

    return <EmojiPicker onEmojiClick={(data) => onClick(data.unified)} />;
}

export default ReactionCounter;
