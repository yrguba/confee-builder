import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Box, Icons } from 'shared/ui/index';

import styles from './styles.module.scss';
import useModalStore from '../../model/store';
import { BaseModalProps } from '../../model/types';
import { use } from '../../model/use';

function Modal(props: BaseModalProps) {
    const { isOpen, close, children, onClose, closeIcon = true } = props;
    const openModal: any = useModalStore.use.openModal();
    const modal_root = document.querySelector('#modal-root');
    const useModal = use(openModal);

    const closeClick = () => {
        onClose && onClose();
        useModal.close();
        close();
    };

    const classes = useStyles(styles, 'modal');

    return modal_root
        ? ReactDOM.createPortal(
              <Box.Animated visible={isOpen} presence className={styles.mask}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      {closeIcon && (
                          <div className={styles.closeIcon} onClick={closeClick}>
                              <Icons variant="close" />
                          </div>
                      )}
                      <div className={styles.content}>{isOpen && children}</div>
                  </div>
              </Box.Animated>,
              modal_root
          )
        : null;
}

export default Modal;
