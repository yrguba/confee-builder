export type Notification = {
    id: number;
    text: string;
    description: string;
    scope: 'app' | 'desktop' | 'all';
    system?: boolean;
};

export type NotificationProps = {
    disabledApp?: boolean;
    disabledDesktop?: boolean;
    items: Notification[];
};
