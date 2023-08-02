export type NotificationProps = {
    options?: {
        disabledApp?: boolean;
        disabledDesktop?: boolean;
        visionTime?: number;
    };
};

export type Status = 'info' | 'success' | 'warning' | 'error';

export type UseProps = {
    title: string;
    body?: string;
    scope?: 'app' | 'desktop' | 'all';
    system?: boolean;
    callback?: () => void;
};

export type Notification = {
    id: number;
    status: Status;
} & UseProps;
