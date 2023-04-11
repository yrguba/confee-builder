import React, { useEffect } from 'react';

import { useApplicationStore } from 'entities/application';
import { usePrevious } from 'shared/hooks';
import { Notification as NotificationUi } from 'shared/ui';

function Notification() {
    const notifications = useApplicationStore.use.notifications();
    const deleteFirstNotifications = useApplicationStore.use.deleteFirstNotifications();
    const prev = usePrevious(notifications.length);

    const timeout = 5000;

    useEffect(() => {
        if (notifications.length && !prev) {
            setTimeout(() => deleteFirstNotifications(), timeout);
        }
        if (notifications.length && prev && notifications.length > prev) {
            setTimeout(() => deleteFirstNotifications(), timeout);
        }
    }, [notifications.length]);

    return <NotificationUi items={notifications} />;
}

export default Notification;
