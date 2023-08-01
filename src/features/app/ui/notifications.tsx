import React, { useEffect } from 'react';

import { useAppStore, storage } from 'entities/app';
import { usePrevious } from 'shared/hooks';
import { Notification } from 'shared/ui';

function Notifications() {
    const notifications = useAppStore.use.notifications();
    const deleteFirstNotifications = useAppStore.use.deleteFirstNotifications();
    const deleteNotificationsById = useAppStore.use.deleteNotificationsById();
    const prev = usePrevious(notifications.length);

    const timeout = 55000;

    const closeClick = (id: number) => {
        deleteNotificationsById(id);
    };

    const actionClick = (data: any) => {};

    useEffect(() => {
        if (notifications.length && !prev) {
            setTimeout(() => deleteFirstNotifications(), timeout);
        }
        if (notifications.length && prev && notifications.length > prev) {
            setTimeout(() => deleteFirstNotifications(), timeout);
        }
    }, [notifications.length]);

    const notification_scope = storage.localStorageGet('notification_scope');
    return (
        <Notification
            actionClick={actionClick}
            closeClick={closeClick}
            items={notifications}
            disabledApp={!notification_scope?.app}
            disabledDesktop={!notification_scope?.desk}
        />
    );
}

export default Notifications;
