import { NotificationTypes } from 'shared/ui';

export type Notification = NotificationTypes.Notification;

export enum StorageObjectsNames {
    access_token = 'access_token',
    refresh_token = 'refresh_token',
    theme = 'theme',
    subscribed_to_chat = 'subscribed_to_chat',
    notification_scope = 'notification_scope',
    viewerId = 'viewerId',
}
