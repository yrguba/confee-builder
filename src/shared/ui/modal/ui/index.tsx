import React from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Button, Box } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { ModalProps } from '../types';

function Modal(props: ModalProps) {
    const { isOpen, open, width, close, children, onOk, onClose, closeText, okText, headerText, footer = true } = props;

    const modal_root = document.querySelector('#modal-root');

    const closeClick = () => {
        close();
        onClose && onClose();
    };

    const classes = useStyles(styles, 'modal');

    return modal_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={isOpen} presence className={styles.mask} onClick={closeClick}>
                  <div className={classes} style={{ width }} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.header}>
                          <div className={styles.header__title}>{headerText}</div>
                          <div className={styles.header__closeIcon} onClick={closeClick}>
                              <Icons variants="exit" />
                          </div>
                      </div>
                      <div className={styles.content}>{children}</div>
                      {footer && (
                          <div className={styles.footer}>
                              <Button size="s" onClick={closeClick}>
                                  {closeText || 'отмена'}
                              </Button>
                              <Button active size="s" onClick={onOk}>
                                  {okText || 'готово'}
                              </Button>
                          </div>
                      )}
                  </div>
              </Box.Animated>,
              modal_root
          )
        : null;
}

export default Modal;
