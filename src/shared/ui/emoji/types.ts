import { EmojiClickData } from 'emoji-picker-react';

type SharedProps = {};

export type BaseEmojiProps = {
    clickOnEmoji: (arg: EmojiClickData) => void;
    openCloseTrigger?: (isOpen: boolean) => void;
    onMouseMove?: () => void;
};

export type EmojiItemProps = {
    emoji: string;
    clickOnEmoji?: (arg: string) => void;
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
