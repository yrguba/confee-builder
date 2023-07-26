import React from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Button, Box, Icons } from 'shared/ui';

import styles from './styles.module.scss';
import { ModalProps } from '../types';

function Modal(props: ModalProps) {
    const { isOpen, open, width, close, children, onClose, loading } = props;

    const modal_root = document.querySelector('#modal-root');

    const closeClick = () => {
        onClose && onClose();
        close();
    };

    const classes = useStyles(styles, 'modal');

    return modal_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={isOpen} presence className={styles.mask}>
                  <div className={classes} style={{ width }} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.closeIcon} onClick={closeClick}>
                          <Icons variants="exit" />
                      </div>
                      <div className={styles.content}>{children}</div>
                  </div>
              </Box.Animated>,
              modal_root
          )
        : null;
}

export default Modal;
