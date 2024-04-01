import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { usePrevious } from 'react-use';

import { useStyles, useUpdateEffect } from 'shared/hooks';
import { Box, Icons } from 'shared/ui/index';

import styles from './styles.module.scss';
import { BaseModalProps } from '../../model/types';

function Modal(props: BaseModalProps) {
    const { full, centered = true, isOpen, close, children, onClose, closeIcon = true, open } = props;
    const modal_root = document.querySelector('#modal-root');

    const closeClick = () => {
        onClose && onClose();
        close();
    };

    useUpdateEffect(() => {
        if (!isOpen && onClose) {
            onClose();
        }
    }, [isOpen]);

    const classes = useStyles(styles, 'modal', {
        full,
    });

    return modal_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={isOpen} presence className={`${styles.mask} ${!centered ? styles.mask_top : ''}`}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      {closeIcon && !full && (
                          <div className={styles.closeIcon} onClick={closeClick}>
                              <Icons variant="close" />
                          </div>
                      )}
                      <div className={`${styles.content} ${full ? styles.content_full : ''}`}>{isOpen && children}</div>
                  </div>
              </Box.Animated>,
              modal_root
          )
        : null;
}

export default Modal;
