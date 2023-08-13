import { ReactNode } from 'react';

import { Types } from '../dropdown';

type SharedProps = {
    onClick: (arg: ReactNode) => void;
};

export type BaseEmojiProps = {
    position?: Types.Position;
    clickOnEmoji: (arg: string) => void;
    openCloseTrigger?: (isOpen: boolean) => void;
};

export type EmojiItemProps = {
    unified: string;
} & SharedProps;

export type EmojiListProps = {
    emojiList: string[];
    wrap?: boolean;
} & SharedProps;

export type EmojiCounterItem = {
    name: string;
    avatar: string;
};

export type EmojiCounterProps = {
    emoji: string;
    items?: EmojiCounterItem[];
    maxAvatars?: number;
} & SharedProps;
