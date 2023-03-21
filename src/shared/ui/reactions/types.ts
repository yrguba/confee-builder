type SharedProps = {
    onClick: (arg: string) => void;
};

export type BaseReactionsProps = {} & SharedProps;

export type ReactionListProps = {} & SharedProps;

export type ReactionCounterItem = {
    name: string;
    avatar: string;
};

export type ReactionCounterProps = {
    emoji: string;
    items?: ReactionCounterItem[];
    maxAvatars?: number;
} & SharedProps;
