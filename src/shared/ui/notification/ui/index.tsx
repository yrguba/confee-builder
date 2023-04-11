import React from 'react';
import ReactDOM from 'react-dom';

import { Box } from 'shared/ui';

import styles from './styles.module.scss';
import { NotificationProps } from '../types';

function Notification(props: NotificationProps) {
    const { items } = props;

    const notification_root = document.querySelector('#notification-root');

    return notification_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper}>
                  {items?.map((i) => (
                      <Box.Animated animationVariant="autoHeight" key={i.id} visible presence className={styles.item}>
                          {i.text}
                      </Box.Animated>
                  ))}
              </div>,
              notification_root
          )
        : null;
}

export default Notification;
