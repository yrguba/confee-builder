import { isPermissionGranted, sendNotification } from '@tauri-apps/api/notification';
import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { appService } from 'entities/app';
import { Box, Icons, Title } from 'shared/ui';

import styles from './styles.module.scss';
import * as NotificationTypes from '../types';

function Notification(props: NotificationTypes.NotificationProps) {
    const { items, disabledDesktop, disabledApp, closeClick, actionClick } = props;

    const notification_root = document.querySelector('#notification-root');

    useEffect(() => {
        if (!disabledDesktop && appService.tauriIsRunning) {
            items.forEach((i) => {
                if ((!i.system && i.scope === 'desktop') || i.scope === 'all') {
                    sendNotification({ title: i.description || '', body: i.title });
                }
            });
        }
    }, [items]);

    const isVisible = (i: NotificationTypes.Notification) => {
        if (!disabledApp) return true;
        return !!i.system;
    };

    return notification_root
        ? ReactDOM.createPortal(
              <div className={styles.wrapper}>
                  <AnimatePresence initial={false} presenceAffectsLayout>
                      {items?.map(
                          (i) =>
                              isVisible(i) && (
                                  <motion.div
                                      onClick={(e) => actionClick(i)}
                                      key={i.id}
                                      initial={{ x: 100 }}
                                      animate={{ x: 0 }}
                                      exit={{ x: 200 }}
                                      className={styles.item}
                                  >
                                      {i.description && <Title variant="H2">{i.description}</Title>}
                                      <Title variant="H4M">{i.title}</Title>
                                      <div
                                          onClick={(e) => {
                                              e.stopPropagation();
                                              closeClick(i.id);
                                          }}
                                          className={styles.item_close}
                                      >
                                          <Icons variants="exit" />
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
