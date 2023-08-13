import { EmojiClickData } from 'emoji-picker-react';
import { ReactNode } from 'react';

import { Types } from '../dropdown';

type SharedProps = {};

export type BaseEmojiProps = {
    position?: Types.Position;
    clickOnEmoji: (arg: EmojiClickData) => void;
    openCloseTrigger?: (isOpen: boolean) => void;
};

export type EmojiItemProps = {
    unified: string;
    clickOnEmoji: (arg: string) => void;
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
    clickOnEmoji: (arg: string) => void;
} & SharedProps;

export type { EmojiClickData };
