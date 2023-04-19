import { isPermissionGranted, sendNotification } from '@tauri-apps/api/notification';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { AppService } from 'entities/app';
import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import * as NotificationTypes from '../types';

function Notification(props: NotificationTypes.NotificationProps) {
    const { items, disabledDesktop, disabledApp } = props;

    const notification_root = document.querySelector('#notification-root');

    useEffect(() => {
        if (!disabledDesktop && AppService.tauriIsRunning) {
            items.forEach((i) => {
                if ((!i.system && i.scope === 'desktop') || i.scope === 'all') {
                    sendNotification({ title: i.description, body: i.text });
                }
            });
        }
    }, [items]);

    function Item({ i }: { i: NotificationTypes.Notification }) {
        return (
            <Box.Animated animationVariant="autoHeight" visible className={styles.item}>
                {i.description && <div className={styles.description}>{i.description}</div>}
                <div className={styles.text}>{i.text}</div>
            </Box.Animated>
        );
    }

    return notification_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper}>{items?.map((i) => (i.system ? <Item i={i} /> : disabledApp ? null : <Item i={i} />))}</div>,
              notification_root
          )
        : null;
}

export default Notification;
