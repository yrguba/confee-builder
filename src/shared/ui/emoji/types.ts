import { DropdownTypes } from '../dropdown';

type SharedProps = {
    onClick: (arg: string) => void;
};

export type BaseEmojiProps = {
    position?: DropdownTypes.Position;
    clickOnEmoji: (arg: string) => void;
    openCloseTrigger?: (isOpen: boolean) => void;
};

export type EmojiListProps = {
    emojiList: string[];
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
