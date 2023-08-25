import { sendNotification } from '@tauri-apps/api/notification';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import { usePrevious } from '../../../hooks';
import useNotificationStore from '../model/store';
import * as NotificationsTypes from '../model/types';

function Notification(props: NotificationsTypes.NotificationProps) {
    const { options } = props;

    const notification_root = document.querySelector('#notification-root');

    const notifications = useNotificationStore.use.notifications();
    const deleteFirstNotifications = useNotificationStore.use.deleteFirstNotifications();
    const deleteNotificationsById = useNotificationStore.use.deleteNotificationsById();
    const prev = usePrevious(notifications.length);

    const timeout = options?.visionTime || 5000;

    const closeClick = (id: number) => {
        deleteNotificationsById(id);
    };

    useEffect(() => {
        if (notifications.length && !prev) {
            setTimeout(() => deleteFirstNotifications(), timeout);
        }
        if (notifications.length && prev && notifications.length > prev) {
            setTimeout(() => deleteFirstNotifications(), timeout);
        }
    }, [notifications.length]);

    useEffect(() => {
        if (!options?.disabledDesktop && !!window.__TAURI__) {
            notifications.forEach((i) => {
                if ((!i.system && i.scope === 'desktop') || i.scope === 'all') {
                    console.log('wwwwww');
                    sendNotification({ title: i.body || '', body: i.title });
                }
            });
        }
    }, [notifications]);

    const isVisible = (i: NotificationsTypes.Notification) => {
        if (!options?.disabledApp) return true;
        return !!i.system;
    };

    return notification_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper}>
                  <AnimatePresence initial={false} presenceAffectsLayout>
                      {notifications?.map(
                          (i) =>
                              isVisible(i) && (
                                  <motion.div onClick={i.callback} key={i.id} initial={{ x: 100 }} animate={{ x: 0 }} exit={{ x: 700 }} className={styles.item}>
                                      {i.body && <Title variant="H2">{i.body}</Title>}
                                      <Title variant="H4M">{i.title}</Title>
                                      <div
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              closeClick(i.id);
                                          }}
                                          className={styles.item_close}
                                      >
                                          <Icons variant="close" />
                                      </div>
                                  </motion.div>
                              )
                      )}
                  </AnimatePresence>
              </div>,
              notification_root
          )
        : null;
}

export default Notification;
