import React from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Box, Icons } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseModalProps } from '../../model/types';

function Modal(props: BaseModalProps) {
    const { isOpen, close, children, onClose } = props;

    const modal_root = document.querySelector('#modal-root');

    const closeClick = () => {
        onClose && onClose();
        close();
    };

    const classes = useStyles(styles, 'modal');

    return modal_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={isOpen} presence className={styles.mask}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.closeIcon} onClick={closeClick}>
                          <Icons variants="close" />
                      </div>
                      <div className={styles.content}>{isOpen && children}</div>
                  </div>
              </Box.Animated>,
              modal_root
          )
        : null;
}

export default Modal;
