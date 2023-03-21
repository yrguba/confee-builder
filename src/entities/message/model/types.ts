export type Massage = {};

export type MessageMenuIcons = 'answer' | 'forward' | 'copy' | 'edit' | 'delete' | 'mention' | 'convert';

export type MessageMenuItem = {
    id: number;
    title: string;
    icon: MessageMenuIcons;
};
