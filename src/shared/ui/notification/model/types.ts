export type NotificationProps = {
    options?: {
        disabledApp?: boolean;
        disabledDesktop?: boolean;
        visionTime?: number;
    };
};

export type Status = 'info' | 'success' | 'warning' | 'error';

export type Notification = {
    id: number;
    status: Status;
} & ManagerProps;

export type ManagerProps = {
    title: string;
    body?: string;
    scope?: 'app' | 'desktop' | 'all';
    system?: boolean;
    callback?: () => void;
};
