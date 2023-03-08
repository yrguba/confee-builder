import React, { ReactNode } from 'react';
import ReactDOM from 'react-dom';

import { useStyles } from 'shared/hooks';
import { Button, Box } from 'shared/ui';

import Icons from './icons';
import styles from './styles.module.scss';
import { ModalHookReturnedType } from './useModal';

type Props = {
    children: ReactNode;
    onOk?: () => void;
    onClose?: () => void;
    footer?: boolean;
    headerText?: string;
    okText?: string;
    closeText?: string;
} & ModalHookReturnedType;

function Modal(props: Props) {
    const { isOpen, open, close, children, onOk, onClose, closeText, okText, headerText, footer = true } = props;

    const modal_root = document.querySelector('#modal-root');

    const closeClick = () => {
        close();
        onClose && onClose();
    };

    const classes = useStyles(styles, 'modal');

    return modal_root
        ? ReactDOM.createPortal(
              <Box.Animate isVisible={isOpen} presence className={styles.mask} onClick={closeClick}>
                  <div className={classes} onClick={(e) => e.stopPropagation()}>
                      <div className={styles.header}>
                          <div className={styles.header__title}>{headerText}</div>
                          <div className={styles.header__closeIcon} onClick={closeClick}>
                              <Icons variants="close" />
                          </div>
                      </div>
                      <div className={styles.content}>{children}</div>
                      {footer && (
                          <div className={styles.footer}>
                              <Button onClick={closeClick}>{closeText || 'отмена'}</Button>
                              <Button onClick={onOk}>{okText || 'готово'}</Button>
                          </div>
                      )}
                  </div>
              </Box.Animate>,
              modal_root
          )
        : null;
}

export default Modal;
