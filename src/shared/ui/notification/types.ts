export type Notification = {
    id: number;
    title: string;
    description?: string;
    scope?: 'app' | 'desktop' | 'all';
    system?: boolean;
    status?: 'info' | 'success' | 'warning' | 'error';
};

export type NotificationProps = {
    disabledApp?: boolean;
    disabledDesktop?: boolean;
    items: Notification[];
    closeClick: (id: number) => void;
    actionClick: (data: Notification) => void;
};
