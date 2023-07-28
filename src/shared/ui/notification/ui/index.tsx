import { isPermissionGranted, sendNotification } from '@tauri-apps/api/notification';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { AppService } from 'entities/app';
import { Box, Title } from 'shared/ui';

import styles from './styles.module.scss';
import * as NotificationTypes from '../types';

function Notification(props: NotificationTypes.NotificationProps) {
    const { items, disabledDesktop, disabledApp } = props;

    const notification_root = document.querySelector('#notification-root');

    useEffect(() => {
        if (!disabledDesktop && AppService.tauriIsRunning) {
            items.forEach((i) => {
                if ((!i.system && i.scope === 'desktop') || i.scope === 'all') {
                    sendNotification({ title: i.description || '', body: i.text });
                }
            });
        }
    }, [items]);

    function Item({ i }: { i: NotificationTypes.Notification }) {
        return (
            <div className={styles.item}>
                {i.description && <Title variant="H2">{i.description}</Title>}
                <Title variant="H4M">{i.text}</Title>
            </div>
        );
    }

    return notification_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper}>
                  {items?.map((i) => (i.system ? <Item key={i.id} i={i} /> : disabledApp ? null : <Item i={i} key={i.id} />))}
              </div>,
              notification_root
          )
        : null;
}

export default Notification;
